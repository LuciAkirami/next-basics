"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            console.log("Succesfull");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const getUserDetails = async () => {
        console.log("inside getuser");
        const res = await axios.get("/api/users/me");
        console.log(res.data); // it contains message and data
        setData(res.data.data._id);
    };

    // using React's useEffect()
    // whenever the user visits the profile page, automatically
    // the getUserDetails() get's called and fetches the users details
    React.useEffect(() => {
        getUserDetails();
    }, []);
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h1 className="p-1 rounded-md bg-violet-500 hover:bg-violet-600 mt-2">
                {!data ? (
                    "Fetching"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h1>
            <hr />
            <button
                className="p-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white mb-4 rounded-md transition-colors"
                onClick={logout}
            >
                Logout
            </button>
            {/* Instead of using useEffect, you can also create a button, which 
            when user clicks, it will run the getUserDetails function */}
            {/* <button
                className="p-2 mt-4 bg-green-600 hover:bg-green-700 text-white mb-4 rounded-md transition-colors"
                onClick={getUserDetails}
            >
                Get User Data
            </button> */}
        </div>
    );
}

export default ProfilePage;
