"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/form-input";
import { cn } from "@/lib/utils";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the input values to the console
    console.log("Signup Data:", {
      email,
      password,
      username,
    });

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        if (error.message.includes("rate limit")) {
          setError("You've hit the signup rate limit. Please try again later.");
        } else {
          setError(error.message);
        }
      } else {
        setSuccess(true);
        // Set a timer for redirect after 5 seconds
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error occurred. Please try again.");
    }
  };

  const handleAlertClose = () => {
    setSuccess(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] py-12">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-lg bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center flex items-center justify-center">
          <IconUserPlus className="mr-2 h-6 w-6" />
          Signup
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                placeholder="Enter your name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="myAccountEmail@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Signup &rarr;
            <BottomGradient />
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
          <div className="text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>

        {success && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <h3 className="text-lg font-bold">Signup Successful!</h3>
              <p>Account created successfully! Please confirm your email to log in to your account.</p>
              <button
                onClick={handleAlertClose}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Signup;
