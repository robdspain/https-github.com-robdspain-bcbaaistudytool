import React from 'react';
    import { Button } from "@/components/ui/button";
    import { ArrowLeft, ArrowRight } from 'lucide-react';

    interface ScheduleNavigationProps {
      onNavigateBackward: () => void;
      onNavigateForward: () => void;
      canNavigateBackward: boolean;
      canNavigateForward: boolean;
    }

    export const ScheduleNavigation: React.FC<ScheduleNavigationProps> = ({
      onNavigateBackward,
      onNavigateForward,
      canNavigateBackward,
      canNavigateForward
    }) => {
      return (
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={onNavigateBackward}
            variant="outline"
            className="bg-white"
            disabled={!canNavigateBackward}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNavigateForward}
            variant="outline"
            className="bg-white"
            disabled={!canNavigateForward}
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    };
