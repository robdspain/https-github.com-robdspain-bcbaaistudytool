import { Button } from "@/components/ui/button";
import { ExplanationDisplay } from "../ExplanationDisplay";

interface QuizExplanationSectionProps {
  question: any;
  selectedAnswer: string;
  handleNext: () => void;
  onShowTopicSelection: () => void;
}

export const QuizExplanationSection = ({
  question,
  selectedAnswer,
  handleNext,
  onShowTopicSelection,
}: QuizExplanationSectionProps) => {
  return (
    <div className="space-y-4">
      <ExplanationDisplay
        explanation={question.explanation}
        onNext={handleNext}
        isCorrect={selectedAnswer === question.correctAnswer}
      />
      <Button
        onClick={onShowTopicSelection}
        variant="outline"
        className="w-full border-quiz-text/20 hover:bg-quiz-accent hover:text-quiz-primary"
      >
        Choose Another Domain
      </Button>
    </div>
  );
};
