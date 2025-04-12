import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check patient first
        const patient = await db.patient.findUnique({
          where: { email: credentials.email }, // Match schema field
        });

        if (patient) {
          const passwordMatch = await compare(credentials.password, patient.password); // Schema: Password
          if (!passwordMatch) {
            return null;
          }
          return {
            id: patient.id.toString(), // Convert Int to string for NextAuth
            name: `${patient.firstname} ${patient.lastname}`, // Schema: Firstname, Lastname
            email: patient.email, // Schema: Email
            phone: patient.phone || null, // Schema: Phone (nullable)
            role: "patient",
          };
        }

        // Check admin if patient not found
        const admin = await db.admin.findUnique({
          where: { email: credentials.email }, // Match schema field
        });

        if (admin) {
          const passwordMatch = await compare(credentials.password, admin.password); // Schema: Password
          if (!passwordMatch) {
            return null;
          }
          return {
            id: admin.id.toString(), // Convert Int to string for NextAuth
            name: `${admin.firstname} ${admin.lastname}`, // Schema: Firstname, Lastname
            email: admin.email, // Schema: Email
            phone: null, // Admin has no Phone field
            role: "admin",
          };
        }

        // No user found
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          phone: token.phone,
          role: token.role,
        },
      };
    },
  },
};