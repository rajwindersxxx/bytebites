import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import bcrypt from "bcrypt";
import { signInSchema } from "./zod";
import { createAUserDB, getUserDB } from "../_servers/supabase/users";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // valid input using zod schema
          const { email: inputEmail, password: inputPassword } =
            await signInSchema.parseAsync(credentials);
          // Fetch user data from database
          const { data } = await getUserDB(inputEmail);
          const { password: hashedPassword, id, username } = data;
          //  compare password with hash
          const isValidPassword = await bcrypt.compare(
            inputPassword,
            hashedPassword,
          );
          if (!isValidPassword) throw new Error("Invalid email or password");

          return { id, name: username, email: inputEmail };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
      if (account?.provider === "google") {
        try {
          const { data } = await getUserDB(profile?.email || "");
          if (!data) {
            const newUser = {
              email: profile?.email || "",
              username: profile?.name || "",
              image: profile?.picture || "",
              password: "NOT DEFINED",
            };
            const { id, error } = await createAUserDB(newUser);
            user.id = id;
            if (error) {
              console.error("Error creating Google user:", data.error);
              return false;
            }
            console.log("New user created successfully.");
          } else {
            user.id = data.id;
          }
          return true;
        } catch (error) {
          console.error("Error during Google sign-in:", error);
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        emailVerified: token.emailVerified as Date | null,
      };
      return session;
    },
  },
});
