import AWS from 'aws-sdk';

const ses = new AWS.SES();

function createEmail(body) {
  const { myEmail, email, subject, message } = JSON.parse(body);

  return {
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
  };
}

function createResponse(statusCode) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}

function originValid(origin, stage) {
  const validOrigins = [
    'https://albanyrvresort.com',
    'https://www.albanyrvresort.com',
    ...(stage === 'dev' ? ['http://localhost:3000'] : []),
  ];

  return validOrigins.includes(origin);
}

export async function sendEmail(event) {
  const { origin } = event.headers;
  const { stage } = event.requestContext;

  if (!originValid(origin, stage)) {
    return createResponse(403);
  }

  try {
    const email = createEmail(event.body);

    await ses.sendEmail(email).promise();

    return createResponse(200);
  } catch (e) {
    return createResponse(e.statusCode || 500);
  }
}
