import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "../../../libs/dbConnect";

import User from "../../../models/user.model";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MaraPop",
      credentials: {
        email: {
          label: "email address",
          type: "email",
          placeholder: "john.doe@email.com",
        },
        password: {
          type: "password",
          label: "password",
          placeholder: "Please enter your password",
        },
      },
      authorize: async (credentials) => {
        await dbConnect();
        const { email, password } = credentials;

        //checking if user is on the database
        let user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        //checking if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return null;
      },
    }),
  ],
  callback: {
    jwt: ({ token, user }) => {
      if (token) {
        token.id = user_id;
        token.firstName = user.firstName;
        token.lastName = user.lasttName;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session) {
        session.id = token.id;
        token.firstName = user.firstName;
        token.lastName = user.lasttName;
      }
      return session;
    },
    secret: "secret",
  },
  jwt: {
    secret: "ThisIsMySecret",
    encrypt: true,
  },
});
