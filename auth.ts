import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma/prisma";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {
					type: "email",
				},
				password: {
					type: "password",
				},
			},
			async authorize(credentials) {
				if (credentials === null) return null;
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email!,
					},
				});
				if (user && user.password) {
					const isMatch = compareSync(
						credentials.password as string,
						user.password
					);
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						};
					}
				}
				return null;
			},
		}),
	],
	pages: {
		signIn: "/sign-in",
		error: "/sign-in",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 60 * 24 * 60, // 30 days
	},
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ trigger, session, token, user }) {
			session.user.id = token.sub!;
			if (trigger === "update") {
				session.user.name = user.name;
			}
			return session;
		},
	},
});
