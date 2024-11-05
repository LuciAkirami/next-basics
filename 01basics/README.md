# Next.js - Server and Client Components

To understand Server and Client components, we must be fimilar with two things

### Environments

![](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Flearn-client-and-server-environments.png&w=1920&q=75&dpl=dpl_BEtWV8P6BcgqdsQCC5X2naK8dCT8)

This is the place where our code gets executed. It can be either a client or a server environment

- client environment: This refers to the browser on a user’s device that sends a request to a server for your application code. It then turns the response it receives from the server into an interface the user can interact with.

- server environment: This refers to the computer in a data center that stores your application code, receives requests from a client, does some computation, and sends back an appropriate response.

Each environment has its own set of capabilities and constraints. For example, by moving rendering and data fetching to the server, you can reduce the amount of code sent to the client, which can improve your application's performance. But, as you learned earlier, to make your UI interactive, you need to update the DOM on the client.

Therefore, the code you write for the server and the client is not always the same. Certain operations (e.g. data fetching or managing user state) are better suited for one environment over the other.

Like when managing with database operations, you do not want to execute them on client side and rather execute it on the server side

### Network Boundary

The Network Boundary is a conceptual line that separates the different environments.

In React, you choose where to place the network boundary in your component tree. For example, you can fetch data and render a user's posts on the server (using Server Components), then render the interactive LikeButton for each post on the client (using Client Components).

![](https://nextjs.org/_next/image?url=%2Flearn%2Fdark%2Flearn-client-server-modules.png&w=1920&q=75&dpl=dpl_BEtWV8P6BcgqdsQCC5X2naK8dCT8)

Behind the scenes, the components are split into two module graphs. The server module graph (or tree) contains all the Server Components that are rendered on the server, and the client module graph (or tree) contains all Client Components.

After Server Components are rendered, a special data format called the React Server Component Payload (RSC) is sent to the client. The RSC payload contains:

The rendered result of Server Components.
Placeholders (or holes) for where Client Components should be rendered and references to their JavaScript files.
React uses this information to consolidate the Server and Client Components and update the DOM on the client.

### Next.js

- Next.js uses Server Components by default - this is to improve your application's performance and means you don't have to take additional steps to adopt them. And the Server components do not allow to use any React Hooks, hence to use React Hooks like useState, useEffect etc, we need to use a Client Component
- To create a Client Component, add the React 'use client' directive at the top of the file. This tells React to render the component on the client.

# Next.js Routing Files

### page.tsx

- It contains the UI components that is unique to a route. From this file the UI will be loaded for that specific route
- Its linked to the Next.js's folder structure to create your routing system
- To create a new route, we can just create a new folder within the `app` folder and add the page.tsx to it
- So, if we create a `blog` folder inside the `app` folder and then place a `page.tsx` in it, then if we go to the `localhost:3000/blog`, then the content inside the `blog/page.tsx` will be rendered

### Nested Routing

- This also allows us to create a nested routing. So if we have the following structure `app/blog/posts/page.tsx`, then if we go to the `localhost:3000/blog/posts`, then the content inside the `blog/archive/posts.tsx` will be rendered

### Dynamic Routing

- Its very simple to create dynamic routing with Next.js. Imagine we have 100s of posts each having their own ID and their own content. For this, we do not need to create 100 folders ranging from `blog/posts/1/page.tsx` to `blog/posts/100/page.tsx`, instead we can create `blog/posts/[id]/page.tsx` Here the use of `[]` will allow the dynamic routing

- To get the `id` parameter, it will be passed down to the function inside the `page.tsx`. We can then access that `id` parameter and if necessary fetch the data from a database for that particular ID and display it
