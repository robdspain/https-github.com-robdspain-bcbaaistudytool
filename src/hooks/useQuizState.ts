import { User } from "@supabase/supabase-js";
    import { useQuizQuestion } from "./useQuizQuestion";
    import { useQuizProgress } from "./useQuizProgress";

    export const useQuizState = (user: User | null) => {
      const {
        isLoading,
        question,
        selectedAnswer,
        showExplanation,
        setSelectedAnswer,
        setShowExplanation,
        generateQuestion
      } = useQuizQuestion(user);

      const {
        currentMain,
        currentSub,
        setCurrentMain,
        setCurrentSub,
        saveUserPreferences,
        handleSubmit: submitAttempt
      } = useQuizProgress(user);

      const handleSubmit = async () => {
        if (!question) {
          console.log('No question available for submission');
          return;
        }
        console.log('Submitting answer:', { selectedAnswer, question });
        await submitAttempt(question, selectedAnswer);
        setShowExplanation(true);
      };

      return {
        isLoading,
        question,
        selectedAnswer,
        showExplanation,
        currentMain,
        currentSub,
        setSelectedAnswer,
        setCurrentMain,
        setCurrentSub,
        generateQuestion,
        handleSubmit,
        saveUserPreferences
      };
    };
