import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
interface Props {
  name: string;
  children: ReactNode;
  handleClick: () => void;
}
//created a sidebar button to avoid duplicate styling
const SidebarButton = ({ name, children, handleClick }: Props) => {
  return (
    <div className="w-full">
      <Button
        onClick={handleClick}
        className="bg-custom-dark-gray flex justify-start my-3  w-full"
      >
        {children}
        <p className="px-2 ">{name}</p>
      </Button>
    </div>
  );
};

export default SidebarButton;
