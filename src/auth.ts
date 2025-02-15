import NextAuth, { NextAuthConfig } from "next-auth";
import authConfig from "./auth.config";

// Interfaces
import { User } from "@/lib/interfaces/auth";

export const options: NextAuthConfig = {
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async authorized({ auth }) {
      const isAuth = !!auth?.user;
      return isAuth;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.email = (user as User).email;
        token.id = (user as User).id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(options);
