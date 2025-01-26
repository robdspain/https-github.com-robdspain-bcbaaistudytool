import React from "react";
    import { Card } from "@/components/ui/card";
    import { Progress } from "@/components/ui/progress";
    import { ChevronDown, ChevronRight } from "lucide-react";
    import { cn } from "@/lib/utils";
    import { formatDistanceToNow } from 'date-fns';

    interface Subdomain {
      name: string;
      percentage: number;
      total: number;
      lastAttempt: string | null;
    }

    interface CategoryCardProps {
      name: string;
      percentage: number;
      subdomains: Subdomain[];
      isExpanded: boolean;
      onToggle: () => void;
    }

    export const CategoryCard = ({ name, percentage, subdomains, isExpanded, onToggle }: CategoryCardProps) => {
      return (
        <Card className="overflow-hidden border-l-4 border-l-quiz-primary">
          <div 
            className="p-4 bg-quiz-primary/5 cursor-pointer flex items-center justify-between transition-colors hover:bg-quiz-primary/10"
            onClick={onToggle}
          >
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-quiz-primary" />
              ) : (
                <ChevronRight className="h-5 w-5 text-quiz-primary" />
              )}
              <h3 className="font-semibold text-quiz-primary">{name}</h3>
            </div>
            <span className="text-sm font-medium text-quiz-primary">
              {percentage}%
            </span>
          </div>
          
          <div className={cn(
            "overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-[1000px]" : "max-h-0"
          )}>
            <div className="p-6 space-y-4">
              {subdomains.map((subdomain, subIndex) => (
                <div key={subIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-quiz-text">{subdomain.name}</p>
                    <p className="text-sm font-medium text-quiz-primary">
                      {subdomain.percentage}%
                    </p>
                  </div>
                  <Progress 
                    value={subdomain.percentage} 
                    className="h-3"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-quiz-text">
                      {subdomain.total} questions answered
                    </p>
                    {subdomain.lastAttempt && (
                      <p className="text-sm text-quiz-text">
                        {formatDistanceToNow(new Date(subdomain.lastAttempt), { addSuffix: true })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      );
    };
