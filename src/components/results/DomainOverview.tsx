import React, { useState, useEffect } from "react";
    import { Card } from "@/components/ui/card";
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
    import { useAuth } from "@/providers/AuthProvider";
    import { supabase } from "@/integrations/supabase/client";
    import { format, subDays, isToday } from 'date-fns';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Alert } from "@/components/ui/alert";
    import { Progress } from "@/components/ui/progress";
    import { LoadingSpinner } from "@/components/quiz/LoadingSpinner";

    interface Subdomain {
      name: string;
      percentage: number;
    }

    interface CategoryStats {
      name: string;
      percentage: number;
      subdomains: Subdomain[];
    }

    interface ChartDataPoint {
      name: string;
      accuracy: number;
    }

    type TimeRange = "daily" | "weekly" | "monthly";

    interface DomainOverviewProps {
      timeRange: TimeRange;
    }

    const domains = [
      "Behaviorism and Philosophical Foundations",
      "Concepts and Principles",
      "Measurement, Data Display, and Interpretation",
      "Experimental Design",
      "Ethical and Professional Issues",
      "Behavior Assessment",
      "Behavior-Change Procedures",
      "Selecting and Implementing Interventions",
      "Personnel Supervision and Management",
    ];

    export const DomainOverview: React.FC<DomainOverviewProps> = ({ timeRange }) => {
      const { user } = useAuth();
      const [selectedDomain, setSelectedDomain] = useState<string>(domains[0]);
      const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
      const [subdomains, setSubdomains] = useState<Subdomain[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      const isValidDomain = (domain: string) => domains.includes(domain);

      useEffect(() => {
        const fetchAnalytics = async () => {
          if (!user || !selectedDomain) {
            setChartData([]);
            setSubdomains([]);
            setLoading(false);
            return;
          }

          setLoading(true);
          setError(null);

          if (!isValidDomain(selectedDomain)) {
            setError('Invalid domain selected');
            setLoading(false);
            return;
          }

          try {
            let startDate = new Date();
            if (timeRange === "weekly") {
              startDate = subDays(new Date(), 7);
            } else if (timeRange === "monthly") {
              startDate = subDays(new Date(), 30);
            }

            const { data: attempts, error: attemptsError } = await supabase
              .from('quiz_attempts')
              .select('*')
              .eq('user_id', user.id)
              .eq('main_category', selectedDomain)
              .gte('created_at', startDate.toISOString());

            if (attemptsError) {
              console.error('Error fetching quiz attempts:', attemptsError);
              setError('Failed to load analytics');
              setLoading(false);
              return;
            }

            const dailyAccuracy = Array(7).fill(0).map((_, index) => {
              const date = subDays(new Date(), 6 - index);
              const formattedDate = format(date, 'EEE d');
              const attemptsOnDate = attempts?.filter(attempt => format(new Date(attempt.created_at), 'EEE d') === formattedDate) || [];
              const correctAttempts = attemptsOnDate.filter(attempt => attempt.is_correct).length;
              const accuracy = attemptsOnDate.length > 0 ? Math.round((correctAttempts / attemptsOnDate.length) * 100) : 0;
              return { name: formattedDate, accuracy };
            });

            const { data: subdomainsData, error: subdomainsError } = await supabase
              .from('subdomain_progress')
              .select('subcategory, current_accuracy')
              .eq('pacing_guides.user_id', user.id)
              .eq('main_category', selectedDomain);

            if (subdomainsError) {
              console.error('Error fetching subdomains:', subdomainsError);
              setError('Failed to load analytics');
              setLoading(false);
              return;
            }

            const subdomains = subdomainsData?.map(item => ({
              name: item.subcategory.replace(/^[A-Z]\.\d+\.\s*/, ''),
              accuracy: item.current_accuracy
            })).sort((a, b) => a.accuracy - b.accuracy) || [];

            setChartData(dailyAccuracy);
            setSubdomains(subdomains);
          } catch (error: any) {
            console.error('Error fetching data:', error);
            setError('Failed to load analytics');
          } finally {
            setLoading(false);
          }
        };

        fetchAnalytics();
      }, [selectedDomain, user, timeRange]);

      const getColor = (accuracy: number) => {
        if (accuracy < 70) return 'red';
        if (accuracy < 90) return 'yellow';
        return 'green';
      };

      if (loading) {
        return (
          <Card className="p-6">
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          </Card>
        );
      }

      if (error) {
        return (
          <Card className="p-6">
            <Alert variant="destructive">{error}</Alert>
          </Card>
        );
      }

      if (chartData.length === 0) {
        return (
          <Card className="p-6">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">No practice sessions found for {selectedDomain}</p>
            </div>
          </Card>
        );
      }

      return (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-quiz-primary">
              Domain Overview
            </h2>
            <Select value={selectedDomain} onValueChange={setSelectedDomain}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain} value={domain}>
                    {domain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#1B584E" strokeWidth={2} stroke={({ dataKey }) => getColor(chartData.find(item => item.name === dataKey)?.accuracy || 0)} />
                <ReferenceLine y={70} strokeDasharray="3 3" stroke="yellow" />
                <ReferenceLine y={90} strokeDasharray="3 3" stroke="green" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            {subdomains.map((sub, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-quiz-text">{sub.name}</span>
                <div className="flex items-center gap-2">
                  <Progress value={sub.accuracy} className="h-2 w-20" />
                  <span className="text-sm font-medium text-quiz-primary">{sub.accuracy}%</span>
                  {sub.accuracy < 70 && <span className="text-red-600">⚠️</span>}
                  {sub.accuracy >= 90 && <span className="text-green-600">✅</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      );
    };
