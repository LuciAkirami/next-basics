import React from "react";

async function Something() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <div>This is something</div>;
}

export default Something;
