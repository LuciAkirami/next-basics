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
    return <div>SignupPage</div>;
}

export default SignupPage;
