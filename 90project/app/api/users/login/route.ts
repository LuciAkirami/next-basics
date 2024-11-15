import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
// the NextRequest and NextResponse are similar to the request and response
// in express
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// make sure to connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        // this is similar to request.body in express
        const reqBody = await request.json();

        // destructuring
        const { email, password } = reqBody;

        // Don't do this prod - console logs
        console.log(reqBody);

        // check if the user exists / signed up
        const user = await User.findOne({ email });

        // if user does not exist
        if (!user) {
            return NextResponse.json(
                { error: "User does not exists" },
                { status: 400 }
            );
        }

        // check the password
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id, // mongo stores an _id for each user
            username: user.username,
            email: user.email,
        };

        // create token - .sign creates a signed token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        // this response can access user cookies
        // hence we need to create the repsonse first
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        });

        // access the cookies and set it
        response.cookies.set("token", token, { httpOnly: true });

        // now return the response
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
