"use client";
import React, { useState } from "react";
import Info from "@/components/Info";
import Chat from "@/components/Chat";
import Loading from "@/components/loading"; 
import { Input } from "@/components/ui/input";
import {
  ArrowUpIcon,
  SunIcon,
  LightningBoltIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { Paperclip } from "lucide-react";
import axios from "axios";
import Image from "next/image";

const Main = () => {
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmittedInput(input);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/legal-query/`, {
        query: input,
      });

      console.log(res.data);
      setResponse(res.data.choices[0].message.content); 
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage(e as any);
    }
  };

  return (
    <div className="main flex flex-col items-center min-h-screen bg-background px-4 relative">
      {loading ? (
        <Loading />
      ) : submittedInput ? (
        <Chat input={submittedInput} response={response} loading={loading} />
      ) : (
        <>
          <h1 className="text-heading text-3xl mt-5 mb-5 text-center hidden md:block">
            LawLens AI
          </h1>
          <div className="features grid grid-cols-3 grid-rows-4 w-3/4 flex-1 gap-4 ml-[11rem] hidden md:grid">
            <div className="flex flex-col justify-center items-center col-start-1 text-center">
              <SunIcon className="text-foreground" />
              <p className="text-foreground bot mt-1">Examples</p>
            </div>
            <div className="col-start-1 row-start-2">
              <Info prompt="Analyze a contract breach: John designs a logo for $2,000; the startup cancels and refuses payment." />
            </div>
            <div className="col-start-1 row-start-3">
              <Info prompt="Interpret: 'Willfully injuring someone with a weapon is a felony, minimum five years imprisonment.'" />
            </div>
            <div className="flex flex-col justify-center items-center row-start-1 col-start-2 text-center">
              <LightningBoltIcon className="text-foreground" />
              <p className="text-foreground mt-1">Capabilities</p>
            </div>
            <div className="col-start-2 row-start-2 flex items-center">
              <Info prompt="Remembers what user said earlier in the conversation" />
            </div>
            <div className="col-start-2 row-start-3">
              <Info prompt="Allows user to provide follow-up corrections" />
            </div>
            <div className="flex flex-col justify-center items-center max-h-screen row-start-1 col-start-3">
              <ExclamationTriangleIcon className="text-foreground" />
              <p className="text-foreground mt-1">Limitations</p>
            </div>
            <Info prompt="May occasionally generate incorrect information" />
            <Info prompt="May occasionally produce harmful instructions or biased content" />
          </div>
        </>
      )}

      {/* Mobile View */}
      <div className="absolute inset-0 flex flex-col items-center justify-start md:hidden">
        <h1 className="text-heading text-2xl font-bold mt-4">AI Lawlense</h1> {/* Moved to the top */}
        <div className="flex flex-col items-center mt-10">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={80} 
            height={80} 
            className="mb-8 rounded-full" 
          />
          <div className="flex flex-col items-center gap-4 mb-16 p-4">
            <Info prompt="Analyze a contract breach: John designs a logo for $2,000; the startup cancels and refuses payment." className="w-64 bg-transparent border border-white" />
            <Info prompt="Interpret: 'Willfully injuring someone with a weapon is a felony, minimum five years imprisonment.'" className="w-64 bg-transparent border border-white" />
          </div>
        </div>
      </div>

      {/* Prompt input area for all screens */}
      {!loading && (
        <div className="absolute bottom-0 w-full flex flex-col items-center bg-background p-4">
          <div className="w-3/4 flex items-center bg-container p-3 rounded-full lg:ml-[11rem] md:ml-[11rem] sm:rounded-full md:rounded-e-full shadow-lg">
            <button className="bg-container hover:bg-inherit">
              <Paperclip className="text-foreground" />
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none px-3 flex-grow"
            />
            <button
              onClick={sendMessage}
              type="submit"
              className="bg-container hover:bg-inherit px-3"
            >
              <ArrowUpIcon />
            </button>
          </div>
          {/* Disclaimer for small devices */}
          <p className="text-center text-sm text-gray-400 mt-2">
            AI Lawlense can make mistakes. Check important info.
          </p>
        </div>
      )}
    </div>
  );
};

export default Main;