
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {login} from "@/app/lib/lib"

export function SignIN(formData: FormData) {
    login(formData);
    
    return;
    //    <button
    //      onClick={handleClick}
    //      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    //    >
    //      {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
    //      <span className="ml-4">Continue with Email</span>
    //    </button>
    //  );
}