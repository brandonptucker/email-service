import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: 'us-east-1' });

function createEmailCommand(body) {
  const { myEmail, email, subject, message } = JSON.parse(body);

  return new SendEmailCommand({
    Source: myEmail,
    ReplyToAddresses: [email],
    Destination: {
      ToAddresses: [myEmail],
    },
    Message: {
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
    },
  });
}

function createResponse(statusCode) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

function originValid(origin) {
  const validOrigins = [
    'https://albanyrvresort.com',
    'https://www.albanyrvresort.com',
    ...(process.env.IS_OFFLINE ? ['http://localhost:3000'] : []),
  ];

  return validOrigins.includes(origin);
}

export async function sendEmail(event) {
  const { origin } = event.headers;

  if (!originValid(origin)) {
    return createResponse(403);
  }

  try {
    const emailCommand = createEmailCommand(event.body);

    await sesClient.send(emailCommand);

    return createResponse(200);
  } catch (e) {
    return createResponse(e.statusCode || 500);
  }
}
