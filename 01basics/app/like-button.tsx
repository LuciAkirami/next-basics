// as we are using useState or any other React State Hooks, we need to use Client Components
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <button
      className="bg-slate-600 px-4 py-2 rounded-md hover:bg-slate-600/80 transition-colors"
      onClick={handleClick}
    >
      Like ({likes})
    </button>
  );
}
