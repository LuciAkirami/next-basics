import { NextResponse } from "next/server";

export async function GET() {
    try {
        // start off by creating a response
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // clear out the token in the cookies
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        // return the response
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
