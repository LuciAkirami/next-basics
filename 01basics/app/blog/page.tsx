// this file gets rendered then we go to "localhost:3000/blog"
// we are using "use client" because we are using the usePathname hook
"use client";
import { usePathname } from "next/navigation";
import React from "react";

function page() {
  const pathName = usePathname();
  const path = pathName.split("/");
  return (
    <div>
      <h1>This is the path name we get from using the usePathname Hook</h1>
      <p> {pathName}</p>
    </div>
  );
}

export default page;
