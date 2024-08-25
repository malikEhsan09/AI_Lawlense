"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";


import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/Input";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Log the input values to the console
    console.log("Signup Data:", {
      email,
      password,
      username,
    });


    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

      // Basic password length validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }


  setLoading(true);
    setError(null);


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

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(name === 'username') {
      setUsername(value);
    }
    else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }

  };

  const handleAlertClose = () => {
    setSuccess(false);
    router.push("/login");
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
      <Image src="/logo.svg" width={80} height={80} alt="Lawlens ai Logo" />
      <h1 className="text-3xl font-extrabold">Create an Account</h1>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              name="username"
              label="Username*"
              value={username}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <Input
              type="email"
              label="Email*"
              value={email}
              onChange={handleInputChange}
              name="email"
         
            />
          </div>
          <div className="relative">
            <Input
              type="password"
              label="Password*"
              value={password}
              onChange={handleInputChange}
              name="password"
          
            />
          </div>
            {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Account created Successfully!</p>}
          <div className="relative">
            <button
            className="h-[45px] w-[295px] rounded-md bg-[#E3A706] text-white"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </button>
          </div>
        </form>
        <div className="my-2 flex justify-center gap-2">
          <p>Already have an account?</p>
          <Link href="/login" className="cursor-pointer text-[#E3A706]">
            Login
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


export default Signup;
