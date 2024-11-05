// this is the page that takes in page.tsx as a children parameter and renders it
// this layout.tsx acts as a layout to all the page.tsx that come below this directory
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
