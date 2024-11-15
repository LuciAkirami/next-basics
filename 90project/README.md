## Project - FullStack Next.js with MongoDB and Appwrite

-   All the backend code is usually contained in `/app/api`, where we define all the routes

### How the verification works?

-   So whenever a user hits an api call to `/user/profile`, a random string / encrypted string is generated (we use bcryptjs for this). This generated string is stored inside the `verifiedToken` and saved in the database of that user.
-   One copy of the encrypted string is even sent to the user/browser/email. Here, the api does not store anything. It just generates the encrypted string and a copy of it is stored in the database and another saved at user/browser
-   So, let's say if I signup to the website, the api creates this encrypted string, stores a copy of it in the database. And sends another copy to my email address, asking to click it to verify
-   When I click on the verify link the email. The api is called again, it will try to parse this token from the URL and check if it matches to any of the users in the database (it checks the `verifyToken`) and if it matches, then it returns a `User` object and the `isVerified` propoerty fo the `User` object is set to `true`
-   Along with generating the `verifyToken`, we also generate a `verifyTokenExpiry`, so that the user should click on the very email within a given time else the link becomes invalid
-   This `verifyTokenExpiry`, the api checks this when the user clicks on the verify link and the `verifyToken` matches to any of the user in the database. And if its not expired, then `isVerified` is set to `true`, else a new encrypted string is generated
-   The forgot password also works in the similar manner and when a user is matched, instead of setting `isVerified` to `true`, the `user.password` is set to the password provided by the user
