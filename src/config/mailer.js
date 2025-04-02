import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

const mailer = async (to, subject, otp) => {
    const htmlContent = `
        <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; padding: 20px; background: linear-gradient(135deg, #ff9a9e, #fad0c4); border-radius: 15px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">
            <div style="text-align: center; padding: 20px;">
                <h1 style="color: #ffffff; font-size: 36px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);">
                    🔒 Your Secure OTP Code
                </h1>
                <p style="color: #ffffff; font-size: 18px; margin-top: 10px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">
                    Hello! Your one-time password (OTP) is:
                </p>
                <div style="margin: 20px auto; padding: 20px; background: #ffffff; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                    <span style="font-size: 32px; font-weight: bold; color: #4CAF50; letter-spacing: 2px;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #ffffff; font-size: 16px; margin-top: 20px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">
                    Please do not share this code with anyone. It is valid for a limited time only.
                </p>
            </div>
            <div style="margin-top: 30px; padding: 20px; background: #ffffff; border-radius: 10px; text-align: center; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                <h2 style="color: #333; font-size: 20px; margin-bottom: 10px;">Why this email?</h2>
                <p style="color: #555; font-size: 14px; line-height: 1.6;">
                    You are receiving this email because you requested an OTP for secure access to your account. If you did not request this, please ignore this email or contact support immediately.
                </p>
            </div>
            <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #ffffff; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);">
                <p>Thank you for using our service!</p>
                <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </footer>
        </div>
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text: `Your OTP is ${otp}. Please do not share it with anyone.`,
            html: htmlContent
        });
        console.log("Mail sent");
    } catch (err) {
        console.log(`${process.env.EMAIL_USER}`);
        console.log("Mail not sent", err.message);
    }
};

export default mailer;