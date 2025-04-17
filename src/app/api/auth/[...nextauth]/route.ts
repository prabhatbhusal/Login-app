
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Define the schema for credentials (matches your form)
const credentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Dummy user database (replace with your actual database logic)
const users = [
  { id: "1", email: "admin@example.com", password: "Admin123!", role: "admin" },
  { id: "2", email: "user@example.com", password: "User123!", role: "user" },
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials with Zod
        const parsedCredentials = credentialSchema.safeParse(credentials);
        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials format");
        }

        const { email, password } = parsedCredentials.data;

        // Simulate database lookup (replace with real DB query)
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Return user object with role for session
        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    // Add role to JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // Add role to session
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Your custom login page
  },
});

export const GET = handlers.GET;
export const POST = handlers.POST;