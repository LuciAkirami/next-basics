// we can do user verification either using client / server components
// for client components, the url needs to be like
// domain.com/verifytoken?token=adgfsdg
// here we can access the token via js using "window.location"

// for server component, the url needs to be like
// domain.com/veriftoken/asfasgfdi
// here we can access the token through the "params"

// we call this function inside the /app/signup/route.ts, so to send a
// verification mail as soon as the user signs up

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bycryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bycryptjs.hash(userId.toString(), 10); // encrypt userId with 10 rounds

        //
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000, // its in ms
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000, // its in ms
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_TRAP_USER,
                pass: process.env.MAIL_TRAP_PASS,
                // TODO - add these cred to .env file
            },
        });

        const mailOptions = {
            from: "lucifer@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }
            or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// As we are giving domain_name/verifyemail?token, we need to create a
// verifyemail page, i.e. creating a folde on that name in next.js and
// inside its page.tsx, we extract the hashedToken

// To Do
// change the emailType to an Enum

// ToDo - Use Better Hash
// The dots(.) and other special characters in the hashedToken may produce
// errors while pasting the url with the hashedtoken in the browser. So
// check for other approaches

// ToDo - Create a Forgot email password
