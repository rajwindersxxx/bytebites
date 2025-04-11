import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signInSchema } from "./zod";
import { getUserDB } from "../_servers/supabase/users";
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
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
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
