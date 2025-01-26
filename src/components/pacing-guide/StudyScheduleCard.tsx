import React from 'react';
    import { Calendar } from 'lucide-react';
    import { Card } from "@/components/ui/card";
    import { DatePicker } from './DatePicker';
    import { StudyFrequencySelector } from './StudyFrequencySelector';
    import { Alert, AlertDescription } from "@/components/ui/alert";
    import { Button } from "@/components/ui/button";
    import { usePacingGuide } from '@/hooks/usePacingGuide';

    interface StudyScheduleCardProps {
      examDate: Date | undefined;
      studyFrequency: string;
      showWarning: boolean;
      onDateChange: (date: Date | undefined) => void;
      onFrequencyChange: (frequency: string) => void;
    }

    export const StudyScheduleCard: React.FC<StudyScheduleCardProps> = ({
      examDate,
      studyFrequency,
      showWarning,
      onDateChange,
      onFrequencyChange
    }) => {
      const { generateSchedule } = usePacingGuide();

      return (
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-full bg-quiz-primary/10">
              <Calendar className="w-6 h-6 text-quiz-primary" />
            </div>
            <h2 className="text-xl font-semibold ml-3 text-quiz-secondary">Study Schedule Setup</h2>
          </div>
          <div className="space-y-4">
            <DatePicker 
              date={examDate} 
              onDateChange={onDateChange}
            />
            <StudyFrequencySelector
              value={studyFrequency}
              onChange={onFrequencyChange}
            />
          </div>
          {showWarning && (
            <Alert className="mt-4 bg-yellow-50 border-yellow-200">
              <AlertDescription className="text-yellow-800">
                Based on your selected frequency and exam date, you'll need to complete multiple subtopics per study session to cover all material.
              </AlertDescription>
            </Alert>
          )}
          <Button
            className="w-full mt-4 bg-quiz-primary hover:bg-quiz-primary/90 text-white"
            onClick={generateSchedule}
          >
            Generate Pacing Guide
          </Button>
        </Card>
      );
    };
