import { useState, useEffect } from "react";
    import { supabase } from "@/integrations/supabase/client";
    import { User } from "@supabase/supabase-js";

    export const useQuizProgress = (user: User | null) => {
      const [currentMain, setCurrentMain] = useState<string>("");
      const [currentSub, setCurrentSub] = useState<string>("");

      useEffect(() => {
        const loadUserPreferences = async () => {
          if (!user) return;
          
          try {
            const { data, error } = await supabase
              .from('user_preferences')
              .select('last_main_topic, last_subtopic')
              .eq('user_id', user.id)
              .maybeSingle();

            if (error) {
              console.error('Error loading preferences:', error);
              return;
            }

            if (data) {
              setCurrentMain(data.last_main_topic || "");
              setCurrentSub(data.last_subtopic || "");
              console.log('Loaded preferences:', data);
            }
          } catch (error) {
            console.error('Error loading preferences:', error);
          }
        };

        loadUserPreferences();
      }, [user]);

      const saveUserPreferences = async (main: string, sub: string) => {
        if (!user) return;

        try {
          setCurrentMain(main);
          setCurrentSub(sub);

          const { error } = await supabase
            .from('user_preferences')
            .upsert({
              user_id: user.id,
              last_main_topic: main,
              last_subtopic: sub
            }, {
              onConflict: 'user_id'
            });

          if (error) throw error;
        } catch (error) {
          console.error('Error saving preferences:', error);
        }
      };

      const handleSubmit = async (question: any, selectedAnswer: string) => {
        if (!user || !currentMain || !currentSub) {
          console.error('Missing user or topic data:', { 
            hasUser: !!user,
            hasMain: !!currentMain,
            hasSub: !!currentSub
          });
          return;
        }

        if (!question || !selectedAnswer) {
          console.error('Missing question or answer data:', {
            hasQuestion: !!question,
            hasAnswer: !!selectedAnswer,
            questionText: question?.question,
            selectedAnswer
          });
          return;
        }

        const isCorrect = selectedAnswer === question.correctAnswer;

        try {
          // Check if a quiz result exists for the current user and topic
          let quizResultId;
          const { data: existingResult, error: resultError } = await supabase
            .from('quiz_results')
            .select('id')
            .eq('user_id', user.id)
            .eq('main_topic', currentMain)
            .eq('subtopic', currentSub)
            .maybeSingle();

          if (resultError) {
            console.error('Error checking existing quiz result:', resultError);
            throw resultError;
          }

          if (existingResult) {
            quizResultId = existingResult.id;
            console.log('Existing quiz result found:', quizResultId);
          } else {
            // Create a new quiz result if one doesn't exist
            const { data: newResult, error: newResultError } = await supabase
              .from('quiz_results')
              .insert({
                user_id: user.id,
                main_topic: currentMain,
                subtopic: currentSub,
                total_questions: 0,
                correct_answers: 0,
                incorrect_answers: 0,
              })
              .select('id')
              .single();

            if (newResultError) {
              console.error('Error creating new quiz result:', newResultError);
              throw newResultError;
            }

            quizResultId = newResult.id;
            console.log('New quiz result created:', quizResultId);
          }

          const attemptData = {
            user_id: user.id,
            main_category: currentMain,
            subcategory: currentSub,
            question_text: question.question,
            selected_answer: selectedAnswer,
            correct_answer: question.correctAnswer,
            is_correct: isCorrect,
            time_taken_seconds: 0,
            quiz_result_id: quizResultId,
          };

          console.log('Saving quiz attempt:', attemptData);

          const { error } = await supabase
            .from('quiz_attempts')
            .insert(attemptData);

          if (error) {
            console.error('Error saving attempt:', error);
            throw error;
          }

          console.log('Quiz attempt saved successfully');

          // Update the quiz results table
          const { error: updateError } = await supabase
            .from('quiz_results')
            .update({
              total_questions: supabase.raw('total_questions + 1'),
              correct_answers: isCorrect ? supabase.raw('correct_answers + 1') : supabase.raw('correct_answers'),
              incorrect_answers: isCorrect ? supabase.raw('incorrect_answers') : supabase.raw('incorrect_answers + 1'),
            })
            .eq('id', quizResultId);

          if (updateError) {
            console.error('Error updating quiz results:', updateError);
            throw updateError;
          }
          console.log('Quiz results updated successfully');
        } catch (error) {
          console.error('Error in handleSubmit:', error);
        }
      };

      return {
        currentMain,
        currentSub,
        setCurrentMain,
        setCurrentSub,
        saveUserPreferences,
        handleSubmit
      };
    };
