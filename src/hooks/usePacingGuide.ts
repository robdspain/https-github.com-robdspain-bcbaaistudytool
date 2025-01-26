import { useState, useEffect, useCallback } from 'react';
    import { supabase } from '@/integrations/supabase/client';
    import { addDays, isAfter } from 'date-fns';

    export interface StudySchedule {
      dates: Date[];
      subtopics: Array<{
        main: string;
        sub: string;
      }>;
    }

    export const usePacingGuide = () => {
      const [loading, setLoading] = useState(true);
      const [examDate, setExamDate] = useState<Date>();
      const [studyFrequency, setStudyFrequency] = useState('daily');
      const [schedule, setSchedule] = useState<StudySchedule[]>([]);
      const [currentPage, setCurrentPage] = useState(0);
      const [showWarning, setShowWarning] = useState(false);

      useEffect(() => {
        const loadPacingGuide = async () => {
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data } = await supabase
              .from('pacing_guides')
              .select('*')
              .eq('user_id', session.user.id)
              .order('created_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (data) {
              setExamDate(data.projected_exam_date ? new Date(data.projected_exam_date) : undefined);
              setStudyFrequency(data.study_frequency);
            }
          } catch (error) {
            console.error('Error loading pacing guide:', error);
          } finally {
            setLoading(false);
          }
        };

        loadPacingGuide();
      }, []);

      const generateSchedule = useCallback(async () => {
        if (!examDate) {
          setSchedule([]);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data: subdomains, error } = await supabase
          .from('subdomain_progress')
          .select('main_category, subcategory')
          .eq('pacing_guides.user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching subdomains:', error);
          return;
        }

        const subtopics = subdomains?.map(item => ({
          main: item.main_category,
          sub: item.subcategory
        })) || [];

        const today = new Date();
        const daysUntilExam = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const daysPerSubtopic = Math.max(1, Math.floor(daysUntilExam / subtopics.length));

        const newSchedule: StudySchedule[] = [];
        let currentDate = new Date(today);

        for (let i = 0; i < subtopics.length; i += 4) {
          const dates = [];
          for (let j = 0; j < 4; j++) {
            if (i + j < subtopics.length) {
              dates.push(new Date(currentDate));
              currentDate = addDays(currentDate, daysPerSubtopic);
            }
          }
          newSchedule.push({
            dates,
            subtopics: subtopics.slice(i, i + 4)
          });
        }

        setSchedule(newSchedule);
        setShowWarning(daysUntilExam < subtopics.length);
      }, [examDate, studyFrequency]);

      const handleDateChange = async (date: Date | undefined) => {
        setExamDate(date);
        if (!date) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;

          await supabase
            .from('pacing_guides')
            .upsert({
              user_id: session.user.id,
              projected_exam_date: date.toISOString(),
              study_frequency: studyFrequency
            });
        } catch (error) {
          console.error('Error saving exam date:', error);
        }
      };

      const handleFrequencyChange = async (frequency: string) => {
        setStudyFrequency(frequency);
        if (!examDate) return;

        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) return;

          await supabase
            .from('pacing_guides')
            .upsert({
              user_id: session.user.id,
              projected_exam_date: examDate.toISOString(),
              study_frequency: frequency
            });
        } catch (error) {
          console.error('Error saving study frequency:', error);
        }
      };

      const navigateSchedule = (direction: 'forward' | 'backward') => {
        setCurrentPage(prev => direction === 'forward' ? prev + 1 : prev - 1);
      };

      const canNavigateBackward = currentPage > 0;
      const canNavigateForward = schedule.length > (currentPage + 1) * 4;

      return {
        loading,
        examDate,
        studyFrequency,
        schedule,
        showWarning,
        handleDateChange,
        handleFrequencyChange,
        navigateSchedule,
        canNavigateBackward,
        canNavigateForward,
        generateSchedule
      };
    };
