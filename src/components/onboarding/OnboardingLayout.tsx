import React from "react";
    import { ProgressBar } from "./ProgressBar";

    interface OnboardingLayoutProps {
      children: React.ReactNode;
      progress: number;
    }

    export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children, progress }) => {
      return (
        <div className="min-h-screen bg-quiz-background flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8">
            <ProgressBar progress={progress} />
            {children}
          </div>
        </div>
      );
    };
