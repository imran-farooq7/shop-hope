import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma/prisma";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
			session.user.role = token.role;
			session.user.name = token.name;
			if (trigger === "update") {
				session.user.name = user.name;
			}
			return session;
		},
		async jwt({ token, user, trigger }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				if (user.name === "NO_NAME") {
					token.name = user.email!.split("@")[0];
					await prisma.user.update({
						where: {
							id: user.id,
						},
						data: {
							name: token.name,
						},
					});
				}
				if (trigger === "signIn" || trigger === "signUp") {
					const cookiesObj = await cookies();
					const sessionCartId = cookiesObj.get("sessionCartId")?.value;
					if (sessionCartId) {
						const sessionCart = await prisma.cart.findFirst({
							where: {
								sessionCartId,
							},
						});
						if (sessionCart) {
							await prisma.cart.deleteMany({
								where: {
									userId: user.id,
								},
							});
							await prisma.cart.update({
								where: {
									id: sessionCart.id,
								},
								data: {
									userId: user.id,
								},
							});
						}
					}
				}
			}
			return token;
		},
		authorized({ request, auth }) {
			if (!request.cookies.get("sessionCartId")) {
				const sessionCartId = crypto.randomUUID();
				const newRequestHeaders = new Headers(request.headers);
				const response = NextResponse.next({
					request: {
						headers: newRequestHeaders,
					},
				});
				response.cookies.set("sessionCartId", sessionCartId);
				return response;
			} else {
				return true;
			}
		},
	},
});
