const AWS = require('aws-sdk');

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

module.exports.sendEmail = async event => {
  const response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    const email = createEmail(event.body);
    await ses.sendEmail(email).promise();
    response.statusCode = 200;
    return response;
  } catch (e) {
    response.statusCode = e.statusCode || 500;
    return response;
  }
};
