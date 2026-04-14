import NextAuth from "next-auth";
import Google from "next-auth/providers/google.js";
import Credentials from "next-auth/providers/credentials";
import loginChecker from "./lib/LoginLogic.js";
import CheckEmail from "./lib/FindEmail.js";
import User from "./schema/User.js";

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
    Google,
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!user.email) {
        return false;
      }
      try {
        const isExists = await CheckEmail(user.email);
        if (!isExists) {
          await User.create({
            name: user.name ?? "Google user",
            email: user.email,
            profileImg: user.profileImg,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender ?? "",
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
        token.id = user._id;
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
});
