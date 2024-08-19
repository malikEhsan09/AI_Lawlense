import React from "react";

interface Props {
  prompt: string;
}

const Info = ({ prompt }: Props) => {
  return (
    <div className="information bg-container rounded-md min-h-full p-2 flex justify-center items-center">
      <p className="text-foreground text-sm">{prompt}</p>
    </div>
  );
};

export default Info;
