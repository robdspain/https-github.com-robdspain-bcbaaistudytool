import { useState, useEffect, useCallback } from "react";
    import { useAuth } from "@/providers/AuthProvider";
    import { supabase } from "@/integrations/supabase/client";
    import { Loader2 } from "lucide-react";
    import { PacingGuide as PacingGuideComponent } from "@/components/pacing-guide/PacingGuide";
    import { ScheduleDisplay } from "@/components/pacing-guide/ScheduleDisplay";
    import { usePacingGuide } from "@/hooks/usePacingGuide";
    import { generatePacingGuide, type StudySchedule } from "@/lib/pacing-guide";
    import { format } from 'date-fns';
    import { Button } from "@/components/ui/button";
    import { PacingGuideDisplay } from "@/components/pacing-guide/PacingGuideDisplay";

    const PacingGuide = () => {
      const { user } = useAuth();
      const [loading, setLoading] = useState(true);
      const {
        schedule,
        navigateSchedule,
        canNavigateBackward,
        canNavigateForward,
        examDate,
        studyFrequency,
        handleDateChange,
        handleFrequencyChange,
        showWarning,
        generateSchedule
      } = usePacingGuide();
      const [generatedSchedule, setGeneratedSchedule] = useState<StudySchedule[]>([]);

      useEffect(() => {
        if (user) {
          loadPacingGuide();
        }
      }, [user]);

      const loadPacingGuide = async () => {
        try {
          console.log("Loading pacing guide for user:", user?.id);
          const { data, error } = await supabase
            .from("pacing_guides")
            .select("*")
            .eq("user_id", user?.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          if (error) {
            console.error("Error fetching pacing guide:", error);
            throw error;
          }

          console.log("Fetched pacing guide data:", data);
          if (data) {
            setExamDate(data.projected_exam_date ? new Date(data.projected_exam_date) : undefined);
            setStudyFrequency(data.study_frequency);
          }
        } catch (error) {
          console.error("Error loading pacing guide:", error);
        } finally {
          setLoading(false);
        }
      };

      const handleGenerateSchedule = async () => {
        if (examDate && user) {
          setLoading(true);
          console.log("Generating pacing guide with:", { examDate, studyFrequency, userId: user.id });
          try {
            const newSchedule = await generatePacingGuide(examDate, parseInt(studyFrequency), user.id);
            console.log("Generated schedule:", newSchedule);
            setGeneratedSchedule(newSchedule.map(item => ({
              ...item,
              dates: [item.date],
              subtopics: [item.subtopic]
            })));
            console.log("Generated schedule:", newSchedule);
          } catch (error) {
            console.error("Error generating schedule:", error);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("Cannot generate schedule: examDate or user is missing");
        }
      };

      useEffect(() => {
        if (examDate && studyFrequency && user) {
          generateSchedule();
        }
      }, [examDate, studyFrequency, user, generateSchedule]);

      const handleGenerateScheduleClick = () => {
        if (examDate && studyFrequency && user) {
          handleGenerateSchedule();
        }
      };

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin text-quiz-primary" />
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-quiz-primary">Pacing Guide</h1>
          <PacingGuideComponent
            examDate={examDate}
            studyFrequency={studyFrequency}
            showWarning={showWarning}
            onDateChange={handleDateChange}
            onFrequencyChange={handleFrequencyChange}
            onGenerateSchedule={handleGenerateScheduleClick}
          />
          {generatedSchedule.length > 0 && (
            <ScheduleDisplay
              schedule={generatedSchedule}
              onNavigateBackward={() => navigateSchedule('backward')}
              onNavigateForward={() => navigateSchedule('forward')}
              canNavigateBackward={canNavigateBackward}
              canNavigateForward={canNavigateForward}
            />
          )}
          <PacingGuideDisplay examDate={examDate} studyFrequency={studyFrequency} />
        </div>
      );
    };

    export default PacingGuide;
