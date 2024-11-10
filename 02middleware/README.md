## Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly. We can basically use it to protect our routes

Usecases - Where middleware can be used

- Authentication and Authorization: Ensure user identity and check session cookies before granting access to specific pages or API routes.
- Server-Side Redirects: Redirect users at the server level based on certain conditions (e.g., locale, user role).
- Path Rewriting: Support A/B testing, feature rollouts, or legacy paths by dynamically rewriting paths to API routes or pages based on request properties.
- Bot Detection: Protect your resources by detecting and blocking bot traffic.
- Logging and Analytics: Capture and analyze request data for insights before processing by the page or API.
- Feature Flagging: Enable or disable features dynamically for seamless feature rollouts or testing.

Usecases - Where middleware should not be used

- Complex Data Fetching and Manipulation: Middleware is not designed for direct data fetching or manipulation, this should be done within Route Handlers or server-side utilities instead.
- Heavy Computational Tasks: Middleware should be lightweight and respond quickly or it can cause delays in page load. Heavy computational tasks or long-running processes should be done within dedicated Route Handlers.
- Extensive Session Management: While Middleware can manage basic session tasks, extensive session management should be managed by dedicated authentication services or within Route Handlers.
- Direct Database Operations: Performing direct database operations within Middleware is not recommended. Database interactions should be done within Route Handlers or server-side utilities.

## How to get started?

Use the file middleware.ts (or .js) in the root of your project to define Middleware. For example, at the same level as pages or app, or inside src if applicable.

### Matching Paths

Middleware will be invoked for every route in your project. Given this, it's crucial to use matchers to precisely target or exclude specific routes. matcher allows you to filter Middleware to run on specific paths.

Example

```javascript
export const config = {
  matcher: ["/about/:path*", "/dashboard/:path*"],
};
```

Here if we have this configured in our `middleware.ts`, then it will only on the paths within `about` and `dashboard`. We can use regex so matching like negative lookaheads or character matching is supported

- `/about/:path` matches `/about/a` and `/about/b` but not `/about/a/c`
- Putting a `*`, now `/about/:path*` will even match `/about/a/c` and so on nested routes
