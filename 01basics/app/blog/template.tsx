// framer-motion requires "use-client"
"use client";
import { motion } from "framer-motion";
import React from "react";

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* With this, every time we go to a new post/[id], this tempalte.tsx will re-render */}
      {/* motion.div allows for smooth transition between pages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
      {/* The below This is Blog Layout Remains As is, but the above will smooth render */}
      <div className="mt-10 flex items-center justify-center">
        This is Blog Layout
      </div>
    </div>
  );
}

export default BlogLayout;
