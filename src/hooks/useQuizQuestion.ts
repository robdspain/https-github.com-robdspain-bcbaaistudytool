import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const useQuizQuestion = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);

  const findUnexposedQuestion = async (main: string, sub: string) => {
    if (!user) return null;

    const { data: exposedQuestionIds } = await supabase
      .from('question_exposures')
      .select('question_id')
      .eq('user_id', user.id);

    const exposedIds = exposedQuestionIds?.map(exp => exp.question_id) || [];

    const { data: questions } = await supabase
      .from('generated_questions')
      .select('*')
      .eq('main_category', main)
      .eq('subcategory', sub)
      .not('id', 'in', `(${exposedIds.join(',')})`)
      .limit(1);

    return questions?.[0] || null;
  };

  const generateQuestion = async (main: string, sub: string) => {
    if (!selectedAnswer && question) {
      console.log('Must answer current question before generating new one');
      return;
    }

    setIsLoading(true);
    setQuestion(null);
    setSelectedAnswer("");
    setShowExplanation(false);

    try {
      const unexposedQuestion = await findUnexposedQuestion(main, sub);
      
      if (unexposedQuestion) {
        console.log('Found unexposed question:', unexposedQuestion);
        setQuestion({
          question: unexposedQuestion.question_text,
          options: unexposedQuestion.options,
          correctAnswer: unexposedQuestion.correct_answer,
          explanation: unexposedQuestion.explanation
        });

        if (user) {
          await supabase
            .from('question_exposures')
            .insert({
              user_id: user.id,
              question_id: unexposedQuestion.id
            });
        }
      } else {
        console.log('Generating new question via API');
        const { data: generatedQuestion, error: generationError } = await supabase.functions.invoke('generate-question', {
          body: { mainTopic: main, subtopic: sub }
        });

        if (generationError) throw generationError;

        const { data: storedQuestion, error: storageError } = await supabase
          .from('generated_questions')
          .insert({
            main_category: main,
            subcategory: sub,
            question_text: generatedQuestion.question,
            options: generatedQuestion.options,
            correct_answer: generatedQuestion.correctAnswer,
            explanation: generatedQuestion.explanation
          })
          .select()
          .single();

        if (storageError) throw storageError;

        if (user) {
          await supabase
            .from('question_exposures')
            .insert({
              user_id: user.id,
              question_id: storedQuestion.id
            });
        }

        setQuestion(generatedQuestion);
      }
    } catch (error) {
      console.error('Error in question generation process:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    question,
    selectedAnswer,
    showExplanation,
    setSelectedAnswer,
    setShowExplanation,
    generateQuestion
  };
};
