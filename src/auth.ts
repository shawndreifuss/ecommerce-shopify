import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcrypt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Add user ID to the token when signing in
        token.email = user.email; // Optionally add other data
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.error("Validation failed:", validatedFields.error);
          return null;
        }

        const { email, password } = validatedFields.data;

        try {
          const user = await getUserByEmail(email);


          // If user is not found or doesn't have a password, return null
          if (!user || !user.password) {
            console.error("User not found or password not set for user:", email);
            return null;
          }

          // Use bcrypt to compare the provided password with the stored hashed password
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            console.error("Password mismatch for user:", email);
            return null;
          }

          // Passwords match, return the user object
          return user;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ],
});
