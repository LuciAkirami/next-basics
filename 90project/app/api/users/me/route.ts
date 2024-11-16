import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

// connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // get the userId from the request
        const userId = await getDataFromToken(request);
        // the "-password" in select() implies that we do not want the
        // password to be returned in the user fields
        const user = await User.findOne({ _id: userId }).select("-password");
        // returning the user
        return NextResponse.json({
            message: "User found",
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
