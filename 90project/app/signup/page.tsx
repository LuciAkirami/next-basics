"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {};
    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1>Signup</h1>
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
                className="p-2 bg-blue-600 text-white mb-4 rounded-md"
                onClick={onSignup}
            >
                Signup
            </button>
            <Link href={"/login"}>Visit Login Page</Link>
        </div>
    );
}

export default SignupPage;
