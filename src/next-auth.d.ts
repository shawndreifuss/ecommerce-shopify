import NextAuth, { DefaultSession } from "next-auth";

// Extend the Session type to include a role property
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add role to the JWT token
    sub?: string; // Add sub to JWT token if needed
  }
}
