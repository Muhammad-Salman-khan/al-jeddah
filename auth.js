import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import loginChecker from "./Lib/LoginLogic.js";
import CheckEmail from "./Lib/FindEmail.js";
import User from "./schema/User.js";
import connectDB from "./Lib/db.js";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        return await loginChecker(credentials);
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email) {
        return false;
      }
      await connectDB();
      try {
        const isExists = await CheckEmail(user.email);
        if (!isExists) {
          await User.create({
            name: user.name ?? "Google user",
            email: user.email,
            profileImg: user?.image ?? "",
            // address: user?.address ?? "",
            // phoneNumber: user?.phoneNumber ?? "",
            // gender: user.gender ?? "Male",
            password: "",
          });
        }
        return true;
      } catch (error) {
        console.error(`google signIn error`, error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //token max age after that it will expire
  },
  secret: process.env.NEXTAUTH_SECRET,
});
