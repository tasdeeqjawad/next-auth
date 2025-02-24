
import { redirect } from "next/navigation";
import { CredentialsForm } from "@/components/credentialsForm";
import {
  CredentialsSignInButton,
  GithubSignInButton,
  GoogleSignInButton,
} from "@/components/authButtons";

export default async function SignInPage() {
  return (
    
    <div className="bg-blue-300 w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-black flex flex-col rounded-lg items-center w-1/3 mt-10 p-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSignInButton />
        <GithubSignInButton /> 
        <span className="text-2xl font-semibold text-white text-center mt-8">
          Or
        </span>
        <CredentialsSignInButton />
        <CredentialsForm />
      </div>
    </div>
  );
}