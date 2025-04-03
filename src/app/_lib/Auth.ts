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
          const { data, error } = await getUserDB(inputEmail);
          if (error || !data || data.length === 0) {
            console.error("User not found:", error);
            throw new Error("Invalid credentials"); // Prevent error details from leaking
          }
          const { password: hashedPassword, id, username } = data[0];
          //  compare password with hash
          const isValidPassword = await bcrypt.compare(
            inputPassword,
            hashedPassword,
          );

          if (!isValidPassword) {
            throw new Error("Invalid credentials"); // Prevent brute-force attacks
          }
          return { id, name: username, email: inputEmail };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error("Invalid login attempt");
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
        const updatedUser = await getUserByIdDB(Number(token.id));
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
