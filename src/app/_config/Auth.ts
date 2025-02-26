import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signInSchema } from "../_lib/zod";
import { getUser } from "../_servers/supabaseApi";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email: inputEmail, password: inputPassword } =
            await signInSchema.parseAsync(credentials);
          const { data, error: getUserError } = await getUser(inputEmail);

          if (getUserError || !data || data.length === 0) {
            console.error("User not found or error fetching user:", getUserError);
            return null; // Return null if user not found or error occurred
          }

          const { password: hashedPassword, id, name } = data[0]; // extract id and name.

          return new Promise((resolve) => {
            bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
              if (err) {
                console.error("bcrypt compare error:", err);
                return resolve(null); // Resolve with null on error
              }

              if (result) {
                // Return user object if passwords match
                resolve({ id: id, name: name, email: inputEmail }); //Return user object
              } else {
                resolve(null); // Return null if passwords don't match
              }
            });
          });
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Return null if there's a validation or other error
        }
      },
    }),
  ],
});
