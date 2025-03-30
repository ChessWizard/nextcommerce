import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

const GenericTooltip = ({
  children,
  content,
  side = "bottom",
}: {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} className="bg-gray-600 px-3 py-1 z-10 max-w-[200px] text-center">
          <p className="text-xs text-white font-bold">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GenericTooltip;
