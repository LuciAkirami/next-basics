// this is the page that takes in page.tsx as a children parameter and renders it
// this layout.tsx acts as a layout to all the page.tsx that come below this directory
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // You can check the cli that this is logged only once as the layout does not re-render
  console.log("Main Route");
  return (
    <html lang="en">
      <body className="">
        <div className="flex items-center justify-center mt-2 ">
          <nav className="flex gap-4 text-whitebackdrop-blur-sm bg-white/30 px-4 py-2 rounded-md">
            {/* Link from Next.js will let us link to any of the next.js routes */}
            <Link
              className="hover:bg-blue-500 hover:text-white hover:rounded-md hover:px-2"
              href={"/"}
            >
              Home
            </Link>
            {/* When we click on this link, it will go to localhost:3000/blog and fetch blog/page.tsx along with its layout */}
            <Link
              className="hover:bg-blue-500 hover:text-white hover:rounded-md hover:px-2"
              href={"/blog"}
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {children}
          <div className="mt-10 flex flex-col items-center justify-center">
            This is the Root Layout
          </div>
        </div>
      </body>
    </html>
  );
}
