import nodemailer from "nodemailer";


export const sendingEmail = (userEmail, otp) => {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASSWORD,
        }
    });

    // Configure the mailoptions object
    const mailOptions = {
        from: process.env.APP_EMAIL,
        to: userEmail,
        subject: 'OTP XAC THUC',
        text: `OTP XAC THUC EMAIL CUA BAN LA: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}