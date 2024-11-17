"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = React.useState("");
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    };
    // as soon as someone lands on this page, use the useEffect to
    // grab and set the Token
    useEffect(() => {
        // The ideal email should be like localhost:3000/verifyemail?token=asdasf
        const urlToken = window.location.search.split("=")[1];
        console.log(window.location.search);
        console.log(urlToken);
        setToken(urlToken || ""); // if there is no token specified in url
        // like for example when URL is localhost:3000/verifyemail, then urlToken
        // will store undefined, hence we keep an or (||) and set it to empty
        // string ("") if the token is not specified
    }, []); // not dependent on anything

    // As soon as there is a change in token(like the above will change the token
    // from empty string to actual token), then run the below useEffect, which
    // will trigger the verifyUserEmail()
    useEffect(() => {
        // check if there is a token
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]); // dependent on token

    return (
        <div className="flex flex-col min-h-screen items-center justify-center p-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-600 text-black">
                {token ? `${token}` : "No Token"}
            </h2>
            {/* if verified, we show the following */}
            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href={"/login"}>Login</Link>
                </div>
            )}
            {/* if there is an error */}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    );
}
