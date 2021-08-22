const twilio = require('twilio');

function send_sms(mobile, message) {
    const accountSid = App.env.TWILIO_ACCOUNT_SID;
    const authToken = App.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            body: message,
            from: App.env.TWILIO_FROM_SMS,
            to: "+91" + mobile
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err));
}

module.exports = {
    send_sms
};