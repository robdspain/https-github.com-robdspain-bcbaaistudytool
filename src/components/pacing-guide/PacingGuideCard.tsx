import React from 'react';
    import { format } from 'date-fns';
    import { Card } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import { useNavigate } from 'react-router-dom';
    import { CheckCircle } from 'lucide-react';

    interface PacingGuideCardProps {
      date: Date;
      mainTopic: string | null | undefined;
      subtopic: string | null | undefined;
    }

    export const PacingGuideCard: React.FC<PacingGuideCardProps> = ({
      date,
      mainTopic,
      subtopic
    }) => {
      const navigate = useNavigate();

      const handleGoToQuiz = () => {
        navigate('/quiz', { 
          state: { 
            mainTopic, 
            subtopic,
            fromPacingGuide: true 
          } 
        });
      };

      return (
        <Card className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-semibold text-quiz-primary">
                {format(date, 'MMMM d, yyyy')}
              </p>
              <div className="mt-2">
                <p className="text-sm text-quiz-secondary/80">
                  {typeof mainTopic === 'string' ? mainTopic.replace(/^[A-Z]\.\s*/, '') : 'N/A'}
                </p>
                <p className="text-quiz-secondary font-medium">
                  {typeof subtopic === 'string' ? subtopic.replace(/^[A-Z]\.\d+\.\s*/, '') : 'N/A'}
                </p>
              </div>
            </div>
            <Button
              onClick={handleGoToQuiz}
              className="ml-4 bg-quiz-primary/10 hover:bg-quiz-primary/20 text-quiz-primary"
              size="sm"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      );
    };
