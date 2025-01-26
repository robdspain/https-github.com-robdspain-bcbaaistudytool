import React from "react";
    import { Progress } from "@/components/ui/progress";

    interface ProgressBarProps {
      progress: number;
    }

    export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
      return (
        <div className="w-full">
          <Progress value={progress} className="h-3" />
        </div>
      );
    };
