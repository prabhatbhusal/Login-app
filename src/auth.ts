
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!
import { saltAndHashPassword } from "@/app/utils/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = null

      // logic to salt and hash password
      const pwHash = saltAndHashPassword(credentials.password)

      // logic to verify if the user exists
      user = await getUserFromDb(credentials.email, pwHash)

      if (!user) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        throw new Error("Invalid credentials.")
      }

      // return user object with their profile data
      return user
    },
  }),GitHub,Google],
  pages: {
    // Optional: Set custom sign-in page if you have one
    signIn: "/login",
  },
  callbacks: {
    // Add a redirect callback to handle post-authentication redirects
    async redirect({ url, baseUrl }) {
      // Redirect to Dashboard after sign in
      return `${baseUrl}/admin`;
    },
    // You can add other callbacks like session, jwt as needed
  },
})

function getUserFromDb(email: unknown, pwHash: any): any {
  throw new Error("Function not implemented.")
}
