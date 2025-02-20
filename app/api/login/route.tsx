import { NextResponse } from "next/server";
import { login, logout } from "@/app/lib/lib";

export async function POST(req: Request) {
  const formData = await req.formData();

  await login(formData); // This now works correctly

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}

export async function DELETE(req: Request) {
    //const formData = await req.formData();
  
    await logout(); // This now works correctly
  
    return NextResponse.json({ message: "Logoutsuccessful" }, { status: 200 });
  }