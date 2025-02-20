import { NextAuthOptions, User, getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/db/users";
//import { PrismaClient } from "@prisma/client";
//const prisma = new PrismaClient(); 
export const authConfig: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email:{
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: {label: "Password", type: "password"},
            },
            async authorize( credentials ) {
                if (!credentials || !credentials.email || !credentials.password)
                    return null;

                const dbUser = await prisma.user.findFirst({
                    where: { email: credentials.email },
                    select: { id: true, name: true, email: true, password: true },
                });


                
                
                if ( dbUser && dbUser.password === credentials.password ) {
                    const { password, /*createdAt,*/ id, ...dbUserWithoutPassword } = dbUser;
                    return dbUserWithoutPassword as User;
                }

                return null;
            },
        }), 
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            
        })
    ]
}