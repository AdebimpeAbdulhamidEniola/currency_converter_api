import nodemailer from "nodemailer";

dotenv.config()
// Create a reusable transporter function
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.ENV.EMAIL,
            pass: process.ENV.PASSKEY
        }
    });
};

// Function to send an email
export const sendEmail = async (to, subject, text) => {
    const transporter = createTransporter();

    const mailOptions = {
        from: 'adebimpeabdulhamid5@gmail.com', // Sender email
        to, // Recipient email
        subject, // Email subject
        text // Email body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}


