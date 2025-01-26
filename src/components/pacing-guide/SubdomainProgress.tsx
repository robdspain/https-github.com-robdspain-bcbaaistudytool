import React, { useEffect, useState } from 'react';
    import { Progress } from "@/components/ui/progress";
    import { supabase } from "@/integrations/supabase/client";
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
    import { Card } from "@/components/ui/card";

    interface AccuracyStats {
      correct: number;
      total: number;
    }

    interface ChartDataPoint {
      name: string;
      accuracy: number;
    }

    export const SubdomainProgress = () => {
      const [stats, setStats] = useState({
        totalSubtopics: 0,
        attemptedSubtopics: 0,
        targetMetSubtopics: 0
      });

      const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

      useEffect(() => {
        const fetchProgress = async () => {
          try {
            console.log("Fetching subdomain progress...");
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
              console.log("No session found");
              return;
            }

            // Get all subdomain progress entries
            const { data: subdomains, error: subdomainsError } = await supabase
              .from('subdomain_progress')
              .select('*, pacing_guides!inner(*)')
              .eq('pacing_guides.user_id', session.user.id);

            if (subdomainsError) throw subdomainsError;

            // Get quiz attempts from the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const { data: attempts, error: attemptsError } = await supabase
              .from('quiz_attempts')
              .select('*')
              .eq('user_id', session.user.id)
              .gte('created_at', thirtyDaysAgo.toISOString());

            if (attemptsError) throw attemptsError;

            // Calculate metrics
            const totalSubtopics = subdomains?.length || 0;
            
            // Get unique subtopics attempted
            const attemptedSubtopics = new Set(
              attempts?.map(attempt => `${attempt.main_category}-${attempt.subcategory}`)
            ).size;

            // Calculate accuracy for each subtopic
            const accuracyBySubtopic = attempts?.reduce<Record<string, AccuracyStats>>((acc, attempt) => {
              const key = `${attempt.main_category.replace(/^[A-Z]\.\s*/, '')}-${attempt.subcategory.replace(/^[A-Z]\.\d+\.\s*/, '')}`;
              if (!acc[key]) {
                acc[key] = { correct: 0, total: 0 };
              }
              acc[key].total += 1;
              if (attempt.is_correct) {
                acc[key].correct += 1;
              }
              return acc;
            }, {});

            // Count subtopics that met the target accuracy (90%)
            const targetMetSubtopics = Object.values(accuracyBySubtopic || {}).filter(
              (stats: AccuracyStats) => (stats.correct / stats.total) * 100 >= 90
            ).length;

            // Prepare chart data
            const chartData = Object.entries(accuracyBySubtopic || {}).map(([key, stats]) => ({
              name: key.split('-')[1], // Use subcategory name
              accuracy: Math.round((stats.correct / stats.total) * 100),
            })).slice(0, 5); // Show only top 5 most attempted subtopics

            setChartData(chartData);
            setStats({
              totalSubtopics,
              attemptedSubtopics,
              targetMetSubtopics
            });

          } catch (error) {
            console.error("Error fetching progress:", error);
          }
        };

        fetchProgress();
      }, []);

      const progressPercentage = stats.totalSubtopics > 0
        ? (stats.targetMetSubtopics / stats.totalSubtopics) * 100
        : 0;

      return (
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-quiz-secondary">Overall Progress</span>
              <span className="text-sm font-medium text-quiz-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-quiz-accent" />
          </div>
          
          <div className="space-y-2 text-sm text-quiz-secondary/80">
            <p>
              Attempted: {stats.attemptedSubtopics} of {stats.totalSubtopics} subtopics
            </p>
            <p>
              Target Met: {stats.targetMetSubtopics} subtopics at 90%+ accuracy
            </p>
          </div>

          {chartData.length > 0 && (
            <div className="mt-4 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    domain={[0, 100]}
                  />
                  <Tooltip />
                  <ReferenceLine y={90} strokeDasharray="3 3" stroke="#E6B325" />
                  <Bar dataKey="accuracy" fill="#1B584E" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      );
    };
