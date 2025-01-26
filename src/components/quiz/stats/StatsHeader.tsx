import React from "react";
    import { Info } from "lucide-react";
    import {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
    } from "@/components/ui/tooltip";

    interface StatsHeaderProps {
      subtopic: string;
    }

    export const StatsHeader = ({ subtopic }: StatsHeaderProps) => {
      return (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-quiz-primary">{subtopic.replace(/^[A-Z]\.\d+\.\s*/, '')}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-quiz-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Your performance statistics for this topic</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    };
