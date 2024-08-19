import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface Props {
  input: string;
  response: string;
  loading: boolean;
}

const Chat = ({ input, response, loading }: Props) => {
  return (
    <div className="chat-body mt-4 flex-1 flex justify-center overflow-auto">
      <div className="chat flex flex-col text-foreground">
        <div className="flex mt-3 justify-center items-center">
          <div className="chat-message w-3/4 flex p-5 text-left">
            <Avatar className="bg-white">
              <AvatarImage src="https://github.com/shadcn.png" alt="@logo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="ml-3 text-left">{input}</p>
          </div>
        </div>
        <div className="flex mt-3 justify-center items-center bg-container">
          <div className="chat-message reciever w-3/4 flex p-5 text-left">
            <Avatar className="bg-white">
              <AvatarImage src="/logo.png" alt="@logo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {loading ? (
              <p className="ml-3 text-left">Loading...</p>
            ) : (
              <p className="ml-3 text-left">{response}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
