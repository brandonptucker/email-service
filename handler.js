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
  try {
    const email = createEmail(event.body);
    await ses.sendEmail(email).promise();
    return { statusCode: 200 };
  } catch (e) {
    return { statusCode: e.statusCode || 500 };
  }
};
