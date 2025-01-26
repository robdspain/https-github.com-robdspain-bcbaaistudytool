import React from "react";
    import { useQuery } from "@tanstack/react-query";
    import { supabase } from "@/integrations/supabase/client";
    import { Card } from "@/components/ui/card";
    import { StatsPeriod } from "./stats/StatsPeriod";
    import { StatsHeader } from "./stats/StatsHeader";
    import { Progress } from "@/components/ui/progress";

    interface QuizStatsProps {
      mainCategory: string;
      subCategory: string;
      userId: string;
      currentSubtopic: string;
    }

    export const QuizStats = ({ mainCategory, subCategory, userId, currentSubtopic }: QuizStatsProps) => {
      const { data: stats, isLoading } = useQuery({
        queryKey: ['quiz-stats', mainCategory, subCategory, userId],
        queryFn: async () => {
          if (!userId || !mainCategory || !subCategory) {
            console.log('Missing required parameters:', { userId, mainCategory, subCategory });
            return null;
          }

          console.log('Fetching quiz stats with params:', {
            mainCategory,
            subCategory,
            userId
          });

          const now = new Date();
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          const sevenDaysAgo = new Date(today);
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
          const thirtyDaysAgo = new Date(today);
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          const { data: attempts, error } = await supabase
            .from('quiz_attempts')
            .select('*')
            .eq('user_id', userId)
            .eq('main_category', mainCategory)
            .eq('subcategory', subCategory)
            .gte('created_at', thirtyDaysAgo.toISOString())
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching quiz attempts:', error);
            throw error;
          }

          console.log('Retrieved attempts:', attempts);

          const calculatePercentage = (attempts: any[], startDate: Date) => {
            const filtered = attempts.filter(a => {
              const attemptDate = new Date(a.created_at);
              // Reset hours, minutes, seconds for date comparison
              attemptDate.setHours(0, 0, 0, 0);
              startDate.setHours(0, 0, 0, 0);
              return attemptDate >= startDate;
            });
            
            if (filtered.length === 0) return { percentage: 0, attempts: 0 };
            
            const correct = filtered.filter(a => a.is_correct).length;
            const percentage = Math.round((correct / filtered.length) * 100);
            
            console.log(`Stats for period starting ${startDate}:`, {
              total: filtered.length,
              correct,
              percentage
            });
            
            return {
              percentage,
              attempts: filtered.length
            };
          };

          const todayStats = calculatePercentage(attempts || [], today);
          const sevenDayStats = calculatePercentage(attempts || [], sevenDaysAgo);
          const thirtyDayStats = calculatePercentage(attempts || [], thirtyDaysAgo);

          return {
            today: todayStats,
            sevenDays: sevenDayStats,
            thirtyDays: thirtyDayStats,
            totalAttempts: attempts?.length || 0,
            subCategory
          };
        },
        enabled: !!userId && !!mainCategory && !!subCategory,
        refetchInterval: 2000
      });

      if (isLoading) {
        return (
          <Card className="p-6 mt-6 bg-white shadow-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </Card>
        );
      }

      if (!stats) {
        return (
          <Card className="p-6 mt-6 bg-white shadow-lg">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">No attempts recorded yet</p>
              <p className="text-sm">Complete some questions to see your statistics</p>
            </div>
          </Card>
        );
      }

      return (
        <Card className="p-6 mt-6 bg-white shadow-lg">
          <StatsHeader subtopic={currentSubtopic.replace(/^[A-Z]\.\d+\.\s*/, '')} />
          <div className="space-y-6">
            {stats.today.attempts > 0 && (
              <StatsPeriod
                label="Today"
                attempts={stats.today.attempts}
                percentage={stats.today.percentage}
                opacity={1}
              />
            )}
            <StatsPeriod
              label="Past 7 Days"
              attempts={stats.sevenDays.attempts}
              percentage={stats.sevenDays.percentage}
              opacity={1}
            />
            <StatsPeriod
              label="Past 30 Days"
              attempts={stats.thirtyDays.attempts}
              percentage={stats.thirtyDays.percentage}
              opacity={1}
            />
          </div>
        </Card>
      );
    };
