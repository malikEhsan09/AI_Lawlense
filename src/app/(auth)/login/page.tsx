// "use client";
// import React, { useState } from "react";
// import { Label } from "../../../components/ui/label";
// import { Input } from "../../../components/ui/form-input";
// import { cn } from "@/lib/utils";
// import { IconLogin } from "@tabler/icons-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<boolean>(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const { error } = await supabase.auth.signInWithPassword({ email, password });

//       if (error) {
//         setError(error.message);
//       } else {
//         setSuccess(true);
//         setTimeout(() => {
//           setSuccess(false);
//           router.push("/");
//         }, 2000);
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("Unexpected error occurred. Please try again.");
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] py-12">
//       <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-black">
//         <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center flex items-center justify-center">
//           <IconLogin className="mr-2 h-6 w-6" />
//           Login
//         </h2>
//         <form className="my-8" onSubmit={handleSubmit}>
//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="email">Email Address</Label>
//             <Input id="email" placeholder="myAccountEmail@gmail.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </LabelInputContainer>
//           <LabelInputContainer className="mb-4">
//             <Label htmlFor="password">Password</Label>
//             <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </LabelInputContainer>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           <button
//             className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
//             type="submit"
//           >
//             Login &rarr;
//             <BottomGradient />
//           </button>
//           <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
//           <div className="text-center">
//             <p className="text-neutral-600 dark:text-neutral-400">
//               Don't have an account?{" "}
//               <Link href="/signup" className="text-blue-500 hover:underline">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </form>

//          {success && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
//             <div className="bg-white p-4 rounded shadow-lg">
//               <h3 className="text-lg font-bold">Login Successful!</h3>
//               <p>You will be redirected shortly.</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div className={cn("flex flex-col space-y-2 w-full", className)}>
//       {children}
//     </div>
//   );
// };

// export default Login;



'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Basic password length validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage(error.message);
        console.error("Supabase Error:", error.message);
      } else {
        setSuccess(true);
        console.log("Login Successful!");

        setTimeout(() => {
          setSuccess(false);
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
      <Image src="/logo.svg" width={80} height={80} alt="Lawlens ai Logo" />
      <h1 className="text-3xl font-extrabold">Welcome Back</h1>
      <div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            label="Email*"
            value={email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            label="Password*"
            value={password}
            onChange={handleInputChange}
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {success && <p className="text-green-500">Login Successful!</p>}
          <button
            className="h-[45px] w-[295px] rounded-md bg-[#E3A706] text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
        </form>
        <div className="my-2 flex justify-center gap-2">
          <p>Don't have an account?</p>
          <Link href="/signup" className="cursor-pointer text-[#E3A706]">
            Signup
          </Link>
        </div>
        <div className="relative my-4 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-xs text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </div>
      <button
        className="flex h-[45px] w-[295px] items-center justify-center gap-x-2 rounded-md border-[1px] border-gray-300 text-black"
        type="button"
      >
        <Image src="/google.svg" width={20} height={20} alt="Google Logo" />
        Continue with Google
      </button>
    </main>
  );
};

export default Login;


















