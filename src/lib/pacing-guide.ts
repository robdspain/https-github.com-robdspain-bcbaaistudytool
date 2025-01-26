import { addDays, format, isAfter, isBefore, isSameDay } from 'date-fns';
    import { supabase } from '@/integrations/supabase/client';

    interface Subtopic {
      name: string;
      priority: number;
      main: string;
      sub: string;
    }

    interface ScheduleItem {
      date: Date;
      subtopic: Subtopic;
      tasks: string;
    }

    export const generatePacingGuide = async (
      targetExamDate: Date,
      studyDaysPerWeek: number,
      userId: string | undefined,
    ): Promise<ScheduleItem[]> => {
      const today = new Date();
      let currentDate = new Date(today);
      const schedule: ScheduleItem[] = [];
      let studyDayCount = 0;
      let subtopicIndex = 0;

      if (!userId) {
        console.error("User ID is missing");
        return [];
      }

      // Fetch subtopics from the database
      const { data: subdomains, error } = await supabase
        .from('subdomain_progress')
        .select('main_category, subcategory, current_accuracy')
        .eq('pacing_guides.user_id', userId);

      if (error) {
        console.error('Error fetching subdomains:', error);
        return [];
      }

      const subtopics: Subtopic[] = subdomains?.map(item => ({
        name: `${item.main_category.replace(/^[A-Z]\.\s*/, '')} - ${item.subcategory.replace(/^[A-Z]\.\d+\.\s*/, '')}`,
        priority: item.current_accuracy < 90 ? 1 : 2,
        main: item.main_category,
        sub: item.subcategory
      })) || [];

      // Sort subtopics by priority
      subtopics.sort((a, b) => a.priority - b.priority);

      while (isBefore(currentDate, targetExamDate) || isSameDay(currentDate, targetExamDate)) {
        const dayOfWeek = format(currentDate, "EEE");
        if (preferredStudyDays.includes(dayOfWeek) && studyDayCount < studyDaysPerWeek) {
          const subtopic = subtopics[subtopicIndex % subtopics.length];
          schedule.push({
            date: new Date(currentDate),
            subtopic,
            tasks: "Practice Quiz + Review Notes",
          });
          subtopicIndex++;
          studyDayCount++;
        }

        if (studyDayCount === studyDaysPerWeek) {
          studyDayCount = 0;
        }

        currentDate = addDays(currentDate, 1);
      }

      // Add a final review week
      const reviewStartDate = addDays(targetExamDate, -7);
      let reviewDate = new Date(reviewStartDate);
      while (isBefore(reviewDate, targetExamDate) || isSameDay(reviewDate, targetExamDate)) {
        schedule.push({
          date: new Date(reviewDate),
          subtopic: { name: "Final Review", priority: 0, main: null, sub: null },
          tasks: "Full mock exams + weak areas",
        });
        reviewDate = addDays(reviewDate, 1);
      }

      return schedule;
    };

    const preferredStudyDays = ["Sat", "Sun"];
