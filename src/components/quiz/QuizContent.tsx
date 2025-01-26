import React from "react";
    import { QuestionDisplay } from "./QuestionDisplay";
    import { QuizExplanationSection } from "./content/QuizExplanationSection";
    import { useAuth } from "@/providers/AuthProvider";
    import { QuizStats } from "./QuizStats";
    import { Card } from "@/components/ui/card";

    interface QuizContentProps {
      question: any;
      selectedAnswer: string;
      setSelectedAnswer: (answer: string) => void;
      showExplanation: boolean;
      handleSubmit: () => void;
      handleNext: () => void;
      onShowTopicSelection: () => void;
      currentMain: string;
      currentSub: string;
    }

    export const QuizContent = ({
      question,
      selectedAnswer,
      setSelectedAnswer,
      showExplanation,
      handleSubmit,
      handleNext,
      onShowTopicSelection,
      currentMain,
      currentSub
    }: QuizContentProps) => {
      const { user } = useAuth();

      return (
        <div className="space-y-8">
          <QuestionDisplay
            question={question}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onSubmit={handleSubmit}
            showExplanation={showExplanation}
          />
          
          {showExplanation && (
            <QuizExplanationSection
              question={question}
              selectedAnswer={selectedAnswer}
              handleNext={handleNext}
              onShowTopicSelection={onShowTopicSelection}
            />
          )}
        </div>
      );
    };
