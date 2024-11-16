import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // store the current path in a variable
    const path = request.nextUrl.pathname;

    // check if the user is in logn or signup and
    // if they are, set it to true, else false
    const isPublicPath = path === "/login" || path === "/signup";

    // get the cookie token from the browser if it exits else
    // store empty string
    const token = request.cookies.get("token")?.value || "";

    // let's assume the user signed up or logined. Then there will be token
    // present in his browser. So ideally, if he is trying to visit login or
    // signup page, we need to redirect him to some other page as he is already
    // authenticated

    // isPublicPath is True, as they are visiting /login or /singup
    // token is True, as they are already logged in and token present in cookies

    // redirecting the authenticated users to home page / profile page
    if (isPublicPath && token) {
        // this also works
        // return NextResponse.redirect('/')
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // assuming that the user is not signedup or logined, then he will not
    // have a token in the browser cookies, and if he is trying to
    // visit /profile or / page, we should not allow that. hence redirect him
    // to login page

    // isPublicPath will false as they are visting / or /profile etc
    // token will be false as they are not logged in

    // redirecting the non authenticates users to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    // now if the user is not signed in, and he is trying to visit login
    // or signup page, do not redirect them anywhere, let them visit the page
    // this is because, in this case

    // isPublicPath will be True
    // token will be False, hence both the above if conditions fail
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/profile", "/login", "/signup", "/profile/:path*"],
};
