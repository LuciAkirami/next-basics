"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    // buttong will be disabled if any of the fields is empty
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // loading
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            // set loading to true, as we are processing the request
            setLoading(true);
            // sending the user data to the backend api
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Successfull", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message);
        } finally {
            // when signup is completed, set loading to false
            setLoading(false);
        }
    };

    // this useEffect will be triggered whenever there are changes in user
    useEffect(() => {
        // check if all the lengths are > 0
        if (
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ) {
            // if condition is True, then set button disabled to false, so we can click
            setButtonDisabled(false);
        } else {
            // else disable the button until all fields are not empty
            setButtonDisabled(true);
        }
    }, [user]); // will be triggered whenever the values in user changs
    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                className="p-2 mb-4 rounded-md focus:outline-none text-gray-700 border-gray-300 focus:border-gray-600"
                type="text"
                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input
                className="p-2 mb-4 rounded-md focus:outline-none text-gray-700 border-gray-300 focus:border-gray-600"
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 mb-4 rounded-md focus:outline-none text-gray-700 border-gray-300 focus:border-gray-600"
                type="text"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />

            <button
                className="p-2 bg-blue-600 text-white mb-4 rounded-md "
                onClick={onSignup}
                disabled={buttonDisabled}
            >
                Signup
            </button>
            <Link href={"/login"}>Visit Login Page</Link>
        </div>
    );
}

export default SignupPage;
