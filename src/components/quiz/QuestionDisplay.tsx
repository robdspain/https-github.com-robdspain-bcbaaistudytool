import React from "react";
    import { Card } from "@/components/ui/card";
    import { CheckCircle } from "lucide-react";
    import { LoadingSpinner } from "./LoadingSpinner";

    interface Question {
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
    }

    interface QuestionDisplayProps {
      question: Question | null;
      selectedAnswer: string;
      setSelectedAnswer: (answer: string) => void;
      onSubmit: () => void;
      showExplanation: boolean;
    }

    export const QuestionDisplay = ({
      question,
      selectedAnswer,
      setSelectedAnswer,
      onSubmit,
      showExplanation,
    }: QuestionDisplayProps) => {
      if (!question) {
        return (
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-quiz-text/20">
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          </Card>
        );
      }

      const handleAnswerSelect = (value: string) => {
        if (showExplanation) return;
        
        console.log('Answer selected:', {
          value,
          questionText: question.question,
          timestamp: new Date().toISOString()
        });
        
        setSelectedAnswer(value);
        // Only submit after state is updated
        setTimeout(() => {
          onSubmit();
        }, 0);
      };

      const isCorrect = selectedAnswer === question.correctAnswer;

      return (
        <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-lg border border-quiz-text/20">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-quiz-primary mb-4">
                {question.question}
              </h2>
              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const letter = String.fromCharCode(65 + index);
                  const isSelected = selectedAnswer === letter;
                  const isCorrectAnswer = letter === question.correctAnswer;
                  
                  return (
                    <div 
                      key={letter} 
                      onClick={() => handleAnswerSelect(letter)}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${isSelected && showExplanation
                          ? isCorrect
                            ? "border-quiz-primary bg-quiz-primary/10"
                            : "border-red-600 bg-red-50"
                          : "border-gray-200 hover:border-quiz-primary/50 hover:bg-quiz-accent"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className={`${
                            isSelected && showExplanation
                              ? isCorrect
                                ? "text-quiz-primary"
                                : "text-red-600"
                              : "text-quiz-primary"
                          }`}
                        >
                          {option}
                        </span>
                        {showExplanation && isCorrectAnswer && (
                          <CheckCircle className="h-5 w-5 text-quiz-primary" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      );
    };
