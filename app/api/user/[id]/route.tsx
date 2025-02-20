//app/api/user/route.ts
//import { fakeUsers } from "@/db/users";
import {users} from "@/db/users";
import { NextResponse, NextRequest } from "next/server";


//export async function GET() {

//    return new NextResponse(JSON.stringify(users), {
//        status: 200,
//    });
//}

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id);
    if (isNaN(id)) {
        return new NextResponse("Invalid ID", {
            status: 400,
        });
    }

    const user = users.find((u) => u.id === id);

    if (!user) {
        return new NextResponse("User not found", {
            status: 404,
        });
    }

    return new NextResponse(JSON.stringify(user), {
        status: 200,
    });
}

