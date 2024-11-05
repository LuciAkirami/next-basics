import React from "react";
import { Suspense } from "react";
import Something from "./something";

async function AboutPage() {
  // creating an artificial delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div>
      <h1>About Page</h1>
      {/* Suspense is similar to loading.tsx */}
      {/* The Something contains a timer for 2 seconds. Only after the content will be loaded */}
      {/* So until the content is loaded, we can show a loading information which is defined in the fallback */}
      <Suspense fallback={<p>Loading Something....</p>}>
        <Something></Something>
      </Suspense>
    </div>
  );
}

export default AboutPage;
