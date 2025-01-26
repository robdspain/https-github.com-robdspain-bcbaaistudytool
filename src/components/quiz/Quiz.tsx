import { useState } from "react";
    import { Topics } from "./Topics";
    import { QuizHeader } from "./QuizHeader";
    import { LoadingSpinner } from "./LoadingSpinner";
    import { QuizContent } from "./QuizContent";
    import { useAuth } from "@/providers/AuthProvider";
    import { useQuizState } from "@/hooks/useQuizState";
    import { Card } from "@/components/ui/card";

    export const Quiz = () => {
      // Move all hooks to the top level
      const { user } = useAuth();
      const [showTopicSelection, setShowTopicSelection] = useState(true);
      
      const {
        isLoading,
        question,
        selectedAnswer,
        showExplanation,
        currentMain,
        currentSub,
        setSelectedAnswer,
        generateQuestion,
        handleSubmit,
        saveUserPreferences
      } = useQuizState(user);

      // Keep handlers after hooks
      const handleTopicSelect = async (main: string, sub: string) => {
        if (!user) return;
        console.log('Handling topic selection:', { main, sub, userId: user.id });
        await saveUserPreferences(main, sub);
        await generateQuestion(main, sub);
        setShowTopicSelection(false);
      };

      const handleNext = () => {
        if (!currentMain || !currentSub) {
          console.log('Missing current topic selection:', { currentMain, currentSub });
          return;
        }
        console.log('Handling next question:', { currentMain, currentSub });
        setSelectedAnswer("");
        generateQuestion(currentMain, currentSub);
      };

      return (
        <div className="space-y-8">
          <QuizHeader 
            title="BCBA Quiz"
            subtitle="Practice questions based on the BCBA® Task List (6th Edition)"
          />

          {showTopicSelection ? (
            <Topics 
              onSelect={handleTopicSelect} 
              showTopicSelection={showTopicSelection}
              onHideTopicSelection={() => setShowTopicSelection(false)}
            />
          ) : (
            <>
              {isLoading && <LoadingSpinner />}

              {question && !isLoading && (
                <div className="space-y-8">
                  <div className="max-w-2xl mx-auto">
                    <QuizContent
                      question={question}
                      selectedAnswer={selectedAnswer}
                      setSelectedAnswer={setSelectedAnswer}
                      showExplanation={showExplanation}
                      handleSubmit={handleSubmit}
                      handleNext={handleNext}
                      onShowTopicSelection={() => setShowTopicSelection(true)}
                      currentMain={currentMain}
                      currentSub={currentSub}
                    />
                  </div>
                  {user && currentMain && currentSub && (
                    <div className="mt-8 max-w-2xl mx-auto">
                      <QuizStats 
                        userId={user.id}
                        mainCategory={currentMain}
                        subCategory={currentSub}
                        currentSubtopic={currentSub}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      );
    };
