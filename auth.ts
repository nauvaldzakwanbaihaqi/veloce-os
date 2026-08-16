import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { authConfig } from "./auth.config";
import { loginSchema } from "@/lib/validations/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = loginSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
          const user = result[0];

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

          if (passwordsMatch) {
             return {
                id: user.id,
                email: user.email,
                name: user.name,
             };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // token.sub is the standard JWT claim NextAuth auto-populates from user.id
      const userId = (token.sub ?? token.id) as string | undefined;
      if (userId) {
        session.user.id = userId;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
