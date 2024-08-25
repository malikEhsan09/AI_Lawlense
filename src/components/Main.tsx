/* this is the main page */
"use client";
import React from "react";
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
import { useState } from "react";
import axios from "axios";

const Main = () => {
  // Keeping track of the input entered
  const [input, setInput] = useState("");
  const [submittedInput, setSubmittedInput] = useState("");
  const [response, setResponse] = useState(""); // State for storing the backend response
  const [loading, setLoading] = useState(false); // Loading state

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
      setInput("");  // Clear input field
    }
  };

  // Function to handle key down events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage(e as any); // Cast to any to satisfy TypeScript
    }
  };

  return (
    <div className="main flex text-center items-center min-h-screen justify-evenly flex-col bg-background px-4">
      {/* Render Loading component if loading is true */}
      {loading ? (
        <Loading />  // Show the loading spinner
      ) : submittedInput ? (
        <Chat input={submittedInput} response={response} loading={loading} />
      ) : (
        <>
          <h1 className="text-heading text-3xl mt-5 mb-5 text-center">LawLens AI</h1>
          <div className="features grid grid-cols-3 grid-rows-4 w-3/4 flex-1 gap-4 ml-[11rem]">
            {/* Feature content */}
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
            <div className="col-start-1 row-start-4">
              <Info prompt="Advise an online marketplace on minimizing liability." />
            </div>

            {/* Capabilities */}
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
            <div className="col-start-2 row-start-4">
              <Info prompt="Trained to decline inappropriate requests" />
            </div>

            {/* Limitations */}
            <div className="flex flex-col justify-center items-center max-h-screen row-start-1 col-start-3">
              <ExclamationTriangleIcon className="text-foreground" />
              <p className="text-foreground mt-1">Limitations</p>
            </div>
            <Info prompt="May occasionally generate incorrect information" />
            <Info prompt="May occasionally produce harmful instructions or biased content" />
            <Info prompt="Limited knowledge of world and events after 2021" />
          </div>
        </>
      )}
      {/* prompt_input area */}
      {!loading && (
        <div className="prompt-button w-3/4 flex mt-8 mb-8 bg-container px-3 ml-[11rem]">
          <button className="bg-container hover:bg-inherit">
            <Paperclip className="text-foreground" />
          </button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add onKeyDown event handler
            className="border-none px-3"
          />
          <button
            onClick={sendMessage}
            type="submit"
            className="bg-container hover:bg-inherit px-3"
          >
            <ArrowUpIcon />
          </button>
        </div>
      )}
      {/* <p className="text-custom-light-gray text-xs mb-6">
        LawLens AI Free Research Preview. Our goal is to make AI systems more
        natural and safe to interact with. Your feedback will help us improve.
      </p> */}
    </div>
  );
};

export default Main;