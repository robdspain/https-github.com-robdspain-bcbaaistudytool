import React from "react";
import { Progress } from "@/components/ui/progress";

interface StatsPeriodProps {
  label: string;
  attempts: number;
  percentage: number;
  opacity?: number;
}

export const StatsPeriod = ({ label, attempts, percentage, opacity = 1 }: StatsPeriodProps) => {
  return (
    <div style={{ opacity }} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-quiz-text">{label}</span>
        <span className="text-sm text-quiz-text">
          ({attempts} attempts) {percentage}%
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};
