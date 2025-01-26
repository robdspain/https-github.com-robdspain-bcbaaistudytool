import React from "react";

interface QuizHeaderProps {
  title: string;
  subtitle: string;
}

export const QuizHeader = ({ title, subtitle }: QuizHeaderProps) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-quiz-primary">{title}</h1>
      <p className="mt-2 text-quiz-text">{subtitle}</p>
    </div>
  );
};
