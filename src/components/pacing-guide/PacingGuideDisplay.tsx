import React from 'react';
    import { format, eachWeekendOfInterval, isBefore, subDays } from 'date-fns';
    import { useAuth } from '@/providers/AuthProvider';
    import { supabase } from '@/integrations/supabase/client';
    import { Card } from '@/components/ui/card';
    import { PacingGuideCard } from './PacingGuideCard';
    import { Alert } from '@/components/ui/alert';

    interface Subdomain {
      name: string;
      percentage: number;
    }

    interface PacingGuideDisplayProps {
      examDate: Date | undefined;
      studyFrequency: string;
    }

    export const PacingGuideDisplay: React.FC<PacingGuideDisplayProps> = ({ examDate, studyFrequency }) => {
      const { user } = useAuth();
      const [weekends, setWeekends] = React.useState<Date[]>([]);
      const [incompleteSubdomains, setIncompleteSubdomains] = React.useState<Subdomain[]>([]);
      const [schedule, setSchedule] = React.useState<any[]>([]);

      React.useEffect(() => {
        const calculateWeekends = () => {
          if (!examDate) return [];
          const today = new Date();
          if (isBefore(examDate, today)) return [];
          const weekends = eachWeekendOfInterval({ start: today, end: examDate });
          setWeekends(weekends);
          return weekends;
        };

        const fetchIncompleteSubdomains = async () => {
          if (!user) return;
          try {
            const ninetyDaysAgo = subDays(new Date(), 90);
            const { data, error } = await supabase
              .from('subdomain_progress')
              .select('main_category, subcategory, current_accuracy')
              .eq('pacing_guides.user_id', user.id)
              .gte('updated_at', ninetyDaysAgo.toISOString());

            if (error) {
              console.error('Error fetching subdomains:', error);
              return;
            }

            const incomplete = data?.map(item => ({
              name: `${item.main_category.replace(/^[A-Z]\.\s*/, '')} - ${item.subcategory.replace(/^[A-Z]\.\d+\.\s*/, '')}`,
              percentage: item.current_accuracy
            })).filter(item => item.percentage < 90) || [];
            
            setIncompleteSubdomains(incomplete);
            return incomplete;
          } catch (error) {
            console.error('Error fetching incomplete subdomains:', error);
          }
        };

        const mapSubdomainsToDates = async () => {
          const weekends = calculateWeekends();
          const incomplete = await fetchIncompleteSubdomains();
          if (!weekends || !incomplete) return;

          const sortedSubdomains = [...incomplete].sort((a, b) => a.percentage - b.percentage);
          const schedule = [];
          let subtopicIndex = 0;
          let bufferDayCounter = 0;

          for (let i = 0; i < weekends.length; i++) {
            const weekend = weekends[i];
            const dayOfWeek = format(weekend, 'EEE');
            if (dayOfWeek === 'Sat' || dayOfWeek === 'Sun') {
              if (subtopicIndex < sortedSubdomains.length) {
                schedule.push({
                  date: weekend,
                  subdomain: sortedSubdomains[subtopicIndex % sortedSubdomains.length].name,
                  task: 'Practice quizzes'
                });
                subtopicIndex++;
              }
              bufferDayCounter++;
              if (bufferDayCounter === 4) {
                schedule.push({
                  date: weekend,
                  subdomain: 'Review',
                  task: 'Review weak areas'
                });
                bufferDayCounter = 0;
              }
            }
          }
          setSchedule(schedule);
        };

        calculateWeekends();
        mapSubdomainsToDates();
      }, [examDate, studyFrequency, user]);

      return (
        <div className="mt-8 space-y-4">
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-quiz-primary mb-2">
              Pacing Guide Details
            </h3>
            <div className="text-sm text-quiz-text">
              <p>
                Today’s date: {format(new Date(), 'MMMM d, yyyy')}
              </p>
              <p>
                Target exam date: {examDate ? format(examDate, 'MMMM do, y') : 'Not set'}
              </p>
              <p>
                Study frequency: Weekends (Saturdays + Sundays)
              </p>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold text-quiz-primary mb-2">
              Incomplete Subdomains
            </h3>
            {incompleteSubdomains.length > 0 ? (
              <ul className="text-sm text-quiz-text">
                {incompleteSubdomains.map((subdomain, index) => (
                  <li key={index}>
                    ⚠️ {subdomain.name} ({subdomain.percentage}%)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-quiz-text">🎉 All topics meet mastery goals!</p>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-semibold text-quiz-primary mb-2">
              Study Schedule
            </h3>
            {schedule.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schedule.map((item, index) => (
                  <PacingGuideCard
                    key={index}
                    date={item.date}
                    mainTopic={item.subdomain}
                    subtopic={item.task}
                  />
                ))}
              </div>
            ) : (
              <Alert className="bg-yellow-50 border-yellow-200">
                No study days found. Adjust your exam date.
              </Alert>
            )}
          </Card>
        </div>
      );
    };
