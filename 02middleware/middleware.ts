import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // see that this gets displayed in the terminal when u visit the about page
  console.log("triggered");
  // console.log(request.url);

  // Here, we will be writing code to check if a user is signed in or not
  // and based on that we will see if a user can view a specific page

  // if you are using supabase you'd be using something like
  // const user = supabase.getUser()
  const user = "loggedIn"; // truthy value

  // Try commenting above and uncommenting below and visint the /about
  // const user = ""; // falsey value

  if (!user) {
    // request.url returns the url of the request, here its
    // http://localhost:3000/about when we visit the /about

    // NextResponse.redirect will redirect to specified path
    return NextResponse.redirect(new URL("/", request.url));
  }

  // The next() method is useful for Middleware, as it allows you to return early
  // and continue routing. So if user is loggedIn, we just simply get routed
  // to that page we are trying to go
  return NextResponse.next();
}

// If you comment out below code and the user is "", then the middleware will be
// continously triggered and we get "localhost redirected you too many times".

// This is because, if user is not True, we get redirected to home("/") page.
// But as there is no matcher, the middleware.ts will be triggered even for
// home("/") page and again it checks that user is not True and redirects to
// home("/") again and the loop continues

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
  // we can also pass multiple routes
  // matcher: ["/about/:path*", /blogs/:path*],
};

/**
 * Explanation:
 *
 * Here, only is the user is loggedIn, then he can view the about page and the pages nested inside it
 *
 * If the user is not loggedIn and if the user tries to go to the about page, then they will be redirected
 * to the home page
 *
 * Irrespective of whether they are loggedIn or not, they can visit the blogs page as we have not set the middleware
 * to run on blog route by not providing that path in the matcher
 */
