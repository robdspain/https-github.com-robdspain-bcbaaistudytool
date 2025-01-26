import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

interface ExplanationDisplayProps {
  explanation: string;
  onNext: () => void;
  isCorrect: boolean;
}

export const ExplanationDisplay = ({ 
  explanation, 
  onNext,
  isCorrect 
}: ExplanationDisplayProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mt-4">
        {isCorrect ? (
          <>
            <CheckCircle className="h-6 w-6 text-quiz-primary" />
            <span className="text-quiz-primary font-semibold">Correct!</span>
          </>
        ) : (
          <>
            <XCircle className="h-6 w-6 text-red-600" />
            <span className="text-red-600 font-semibold">Incorrect</span>
          </>
        )}
      </div>
      <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-quiz-text/20">
        <h3 className="font-semibold text-quiz-primary mb-2">Explanation</h3>
        <p className="text-quiz-primary/80">{explanation}</p>
      </div>
      <Button 
        className="w-full bg-quiz-primary hover:bg-quiz-primary/90 text-white" 
        onClick={onNext}
      >
        Next Question <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
