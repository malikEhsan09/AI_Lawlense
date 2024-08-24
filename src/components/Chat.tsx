import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface Props {
  input: string;
  response: string;
  loading: boolean;
}

const Chat = ({ input, response, loading }: Props) => {
  const formattedResponse = formatResponse(response);

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
          <div className="chat-message receiver w-3/4 flex p-5 text-left">
            <Avatar className="bg-white">
              <AvatarImage src="/logo.png" alt="@logo" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {loading ? (
              <p className="ml-3 text-left">Loading...</p>
            ) : (
              <div className="ml-3 text-left whitespace-pre-line response-content">
                {formattedResponse}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to format the response
function formatResponse(response: string): JSX.Element {
  const lines = response.split("\n").map((line, index) => {
    // Remove any ** from the content
    const cleanLine = line.replace(/\*\*/g, "");

    // Apply Tailwind classes for spacing and semi-bold subheadings
    if (cleanLine.startsWith("###")) {
      return (
        <h2
          key={index}
          className="text-2xl font-bold mt-8 mb-4"
          dangerouslySetInnerHTML={{
            __html: cleanLine.replace(/###\s*/, ""),
          }}
        />
      );
    } else if (cleanLine.startsWith("####")) {
      return (
        <h3
          key={index}
          className="text-xl font-semibold mt-6 mb-3"
          dangerouslySetInnerHTML={{
            __html: cleanLine.replace(/####\s*/, ""),
          }}
        />
      );
    } else if (/^\d+\./.test(cleanLine)) {
      // For numbered subheadings, use semi-bold
      return (
        <p
          key={index}
          className="font-semibold mt-4 mb-2"
          dangerouslySetInnerHTML={{
            __html: cleanLine,
          }}
        />
      );
    } else if (cleanLine.startsWith("-")) {
      // Replace dash with dot bullet and make the item bold
      return (
        <ul key={index} className="ml-5 list-disc">
          <li
            className="mb-2 font-bold"
            dangerouslySetInnerHTML={{
              __html: "•" + cleanLine.replace(/-\s*/, ""),
            }}
          />
        </ul>
      );
    } else {
      return (
        <p
          key={index}
          className="mb-4"
          dangerouslySetInnerHTML={{
            __html: cleanLine,
          }}
        />
      );
    }
  });

  return <div>{lines}</div>;
}

export default Chat;
