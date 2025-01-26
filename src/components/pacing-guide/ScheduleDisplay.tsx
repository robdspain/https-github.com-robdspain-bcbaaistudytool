import React from 'react';
    import { ScheduleCard } from './ScheduleCard';
    import { ScheduleNavigation } from './ScheduleNavigation';
    import { StudySchedule } from '@/hooks/usePacingGuide';
    import { format } from 'date-fns';

    interface ScheduleDisplayProps {
      schedule: StudySchedule[];
      onNavigateBackward: () => void;
      onNavigateForward: () => void;
      canNavigateBackward: boolean;
      canNavigateForward: boolean;
    }

    export const ScheduleDisplay: React.FC<ScheduleDisplayProps> = ({
      schedule,
      onNavigateBackward,
      onNavigateForward,
      canNavigateBackward,
      canNavigateForward,
    }) => {
      return (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-quiz-secondary">
            Upcoming Study Schedule
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {schedule.map((item, index) => (
              <React.Fragment key={index}>
                {item.subtopics.map((subtopic, subIndex) => (
                  <ScheduleCard
                    key={`${index}-${subIndex}`}
                    date={item.dates[0]}
                    mainTopic={subtopic.main}
                    subtopic={subtopic.sub}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          <ScheduleNavigation
            onNavigateBackward={onNavigateBackward}
            onNavigateForward={onNavigateForward}
            canNavigateBackward={canNavigateBackward}
            canNavigateForward={canNavigateForward}
          />
        </div>
      );
    };
