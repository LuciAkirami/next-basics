import React from "react";

// From Nextjs 15, params needs to be awaited, else u get warnings
async function UserProfile({ params }: any) {
    const { id } = await params;
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1>Profile Page</h1>
            <hr />
            <p className="text-4xl">Profile Page for {id}</p>
        </div>
    );
}

export default UserProfile;
