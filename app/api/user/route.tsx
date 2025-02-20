//app/api/user/route.ts
//import { fakeUsers } from "@/db/users";
import {users} from "@/db/users";
import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/db/users";

export async function GET() {

    return new NextResponse(JSON.stringify(users), {
        status: 200,
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Insert new user into the database
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            },
        });

        return new NextResponse(JSON.stringify(newUser), {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to create user" }), {
            status: 500,
        });
    }
}
/*export async function DELETE(req: NextRequest) {
    try {
        /*const body = await req.json();

        // Insert new user into the database
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password
            },
        });//
        const { searchParams } = new URL(req.url); // Extract query params
        const id = searchParams.get("id"); // Get the 'id' from query params
        await prisma.user.delete({
            where: {
              id: parseInt(id), // Ensure it's an integer
            })

        return new NextResponse(JSON.stringify("Deletion successful"), {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to delete User" }), {
            status: 500,
        });
    }
}*/

export async function DELETE(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url); // Extract query params
      const id = searchParams.get("id"); // Get the 'id' from query params
  
      if (!id) {
        return new NextResponse(JSON.stringify({ error: "ID is required" }), { status: 400 });
      }
  
      await prisma.user.delete({
        where: { id: parseInt(id) }, // Ensure it's an integer
      });
  
      return new NextResponse(JSON.stringify("Deletion successful"), { status: 200 });
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: "Failed to delete User" }), { status: 500 });
    }
  }