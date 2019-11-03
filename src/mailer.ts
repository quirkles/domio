import * as nodemailer from "nodemailer";

async function sendMail(mailContent) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        auth: {
            pass: testAccount.pass, // generated ethereal password
            user: testAccount.user, // generated ethereal user
        },
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Property alerts" <alerts@domio.com>',
        subject: "Property alert",
        text: mailContent,
        to: "al.quirk@gmail.com",
    });

    // tslint:disable-next-line:no-console
    console.info("Message sent: %s", info.messageId);
    // tslint:disable-next-line:no-console
    console.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendMail;
