import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signInSchema } from "./zod";
import { getUserByIdDB, getUserDB } from "../_servers/supabase/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
          const { data, error: getUserError } = await getUserDB(inputEmail);
          if (getUserError || !data || data.length === 0) {
            console.error(
              "User not found or error fetching user:",
              getUserError,
            );
            return null;
          }
          const { password: hashedPassword, id, username } = data[0];
          //  compare password with hash
          return new Promise((resolve) => {
            bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
              if (err) {
                console.error("bcrypt compare error:", err);
                return resolve(null);
              }

              if (result) {
                resolve({ id: id, name: username, email: inputEmail });
              } else {
                resolve(null);
              }
            });
          });
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        // fetch fresh user data from database 
        const { data: updatedUser } = await getUserByIdDB(Number(token.id));
        session.user = {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.username,
          image: updatedUser.image,
          emailVerified: updatedUser.emailVerified,
        };
      }
      return session;
    },
  },
});
