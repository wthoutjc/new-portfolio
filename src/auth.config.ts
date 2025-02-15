import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Schema
import { AuthSchema } from "@/lib/schemas/auth.schema";

// Database
import { db } from "@/common/database/database";

export const runtime = "nodejs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = AuthSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          console.log({
            username,
            password,
          });

          const user = await db.users.findUnique({
            where: { email: username },
            select: {
              id: true,
              password: true,
              email: true,
            },
          });

          if (user && bcrypt.compareSync(password, user.password)) {
            return {
              id: user.id,
              email: user.email,
            };
          }

          return null;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
