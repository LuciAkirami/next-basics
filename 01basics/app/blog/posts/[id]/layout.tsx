import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="max-w-md">
        This is the layout.tsx present in blog/posts/[id]/layout.tsx which will
        be common for all the posts ids. Try changing the posts/[id] in the URL
        and notice that I will be present at all IDs
      </div>
      <div className="mt-3 flex flex-col items-center">{children}</div>
    </div>
  );
}

export default layout;
