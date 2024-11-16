"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            console.log("Succesfull");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    };
    return (
        <div className="flex flex-col min-h-screen items-center justify-center">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button
                className="p-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white mb-4 rounded-md transition-colors"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
}

export default ProfilePage;
