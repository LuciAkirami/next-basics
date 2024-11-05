import React from "react";

// through params, we can get what "id" the URL contains and do data
// fetching from a database if necessary
function BlogPost({ params }: { params: { id: number } }) {
  return <div>This is Post Number {params.id}</div>;
}

export default BlogPost;
