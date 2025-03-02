"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import swal from "sweetalert";

export function CredentialsForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    console.log("SignIn Response:", signInResponse);

    if (signInResponse && !signInResponse.error) {
      router.push("/dashboard");
    } else {
      setError("Your Email or Password is wrong!");
      swal("Your Email or Password is wrong!");
    }
  };

  return (
    <form
      className="bg-black w-full mt-8 text-xl text-black font-semibold flex flex-col max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-2 sm:p-4 mb-2 text-base sm:text-lg font-semibold text-white bg-red-500 rounded-md text-center">
          {error}
        </span>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-2 sm:py-4 mb-4 border border-gray-300 rounded-md text-base sm:text-xl"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-2 sm:py-4 mb-4 border border-gray-300 rounded-md text-base sm:text-xl"
      />
      <button
        type="submit"
        className="w-full h-10 sm:h-12 px-6 mt-4 text-base sm:text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        Log in
      </button>
    </form>
  );
}