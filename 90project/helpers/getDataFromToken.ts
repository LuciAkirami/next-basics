import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        // verify the token and get the decoded token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        // return what u wanted to return
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// We will use this to get the data in /api/me
