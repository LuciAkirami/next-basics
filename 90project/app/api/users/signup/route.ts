import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
// the NextRequest and NextResponse are similar to the request and response
// in express
import { NextRequest, NextResponse } from "next/server";
import bycrypts from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
// connect to the database, we do not need to resolve the promise
connect();

// for handling requests, we just use the names for the functions like POST, GET, DELETE etc
export async function POST(request: NextRequest) {
    try {
        // this is similar to request.body in express
        const reqBody = await request.json();

        // destructuring
        const { username, email, password } = reqBody;

        // Don't do this prod - console logs
        console.log(reqBody);

        // check if the user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // hashing the password
        const salt = await bycrypts.genSalt(10);
        const hashedPassword = await bycrypts.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // save the new user
        const savedUser = await newUser.save();
        console.log(savedUser);

        // return NextResponse.json(
        //     { message: "User created successfully" },
        //     { status: 201 }
        // );
        // or the below

        // send a email to verify the user
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
