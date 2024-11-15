"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const router = useRouter();
    // buttong will be disabled if any of the fields is empty
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    // loading
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            // set loading to true, as we are processing the request
            setLoading(true);
            // sending the user data to the backend api
            const response = await axios.post("/api/users/login", user);
            console.log("Login Successfull", response.data);
            router.push("/profile/");
        } catch (error: any) {
            console.log("Login Failed", error.message);
        } finally {
            // when login is completed, set loading to false
            setLoading(false);
        }
    };

    // this useEffect will be triggered whenever there are changes in user
    React.useEffect(() => {
        // check if all the lengths are > 0
        if (user.email.length > 0 && user.password.length > 0) {
            // if condition is True, then set button disabled to false, so we can click
            setButtonDisabled(false);
        } else {
            // else disable the button until all fields are not empty
            setButtonDisabled(true);
        }
    }, [user]); // will be triggered whenever the values in user changs
    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
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
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />

            <button
                className="p-2 bg-blue-600 text-white mb-4 rounded-md"
                disabled={buttonDisabled}
                onClick={onLogin}
            >
                Login
            </button>
            <Link href={"/signup"}>Don't have an account? Sign-up</Link>
        </div>
    );
}

export default LoginPage;
