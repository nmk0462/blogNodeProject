const mailer = require("nodemailer");
const ejs = require("ejs");

function send_mail_from_template(fileName, reqData, from, to, subject) {
    const transporter = mailer.createTransport({
        host: App.env.EMAIL_HOST,
        port: App.env.EMAIL_PORT,
        secure: true, // use SSL
        auth: {
            user: App.env.EMAIL_USER,
            pass: App.env.EMAIL_PASSWORD
        }
    });

    ejs.renderFile(__dirname + "/../views/" + fileName, reqData, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            const mainOptions = {
                from: from,
                to: to,
                subject: subject,
                html: data
            };
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }

    });
}

module.exports = {
    send_mail_from_template
};