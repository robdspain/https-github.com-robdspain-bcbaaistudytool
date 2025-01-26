import React, { useState, useEffect } from "react";
    import { Card } from "@/components/ui/card";
    import { supabase } from "@/integrations/supabase/client";
    import { Loader2 } from "lucide-react";
    import { Alert } from "@/components/ui/alert";
    import { Progress } from "@/components/ui/progress";
    import { formatDistanceToNow } from 'date-fns';
    import { cn } from "@/lib/utils";
    import { ChevronDown, ChevronRight } from "lucide-react";
    import { useAuth } from "@/providers/AuthProvider";

    interface Subdomain {
      name: string;
      percentage: number;
      total: number;
      lastAttempt: string | null;
    }

    interface CategoryStats {
      name: string;
      percentage: number;
      subdomains: Subdomain[];
    }

    interface CategoryListProps {
      stats: CategoryStats[];
      expandedCategories: string[];
      onToggleCategory: (category: string) => void;
    }

    export const CategoryList = ({ stats, expandedCategories, onToggleCategory }: CategoryListProps) => {
      const { user } = useAuth();
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [categoryData, setCategoryData] = useState<CategoryStats[]>([]);

      useEffect(() => {
        const fetchCategoryData = async () => {
          if (!user) {
            setCategoryData([]);
            setLoading(false);
            return;
          }

          setLoading(true);
          setError(null);

          try {
            const { data: attempts, error: attemptsError } = await supabase
              .from('quiz_attempts')
              .select('main_category, subcategory, is_correct, created_at')
              .eq('user_id', user.id);

            if (attemptsError) {
              console.error('Error fetching quiz attempts:', attemptsError);
              setError('Failed to load analytics');
              setLoading(false);
              return;
            }

            const { data: subdomains, error: subdomainsError } = await supabase
              .from('subdomain_progress')
              .select('main_category, subcategory, current_accuracy')
              .eq('pacing_guides.user_id', user.id);

            if (subdomainsError) {
              console.error('Error fetching subdomains:', subdomainsError);
              setError('Failed to load analytics');
              setLoading(false);
              return;
            }

            const allSubdomains = subdomains?.reduce((acc: { [key: string]: any }, item) => {
              const mainCategory = item.main_category.replace(/^[A-Z]\.\s*/, '');
              const subcategory = item.subcategory.replace(/^[A-Z]\.\d+\.\s*/, '');

              if (!acc[mainCategory]) {
                acc[mainCategory] = {
                  name: mainCategory,
                  totalCorrect: 0,
                  totalAttempts: 0,
                  subdomains: {}
                };
              }

              acc[mainCategory].subdomains[subcategory] = {
                name: subcategory,
                correct: 0,
                total: 0,
                lastAttempt: null
              };

              return acc;
            }, {});

            const categoryStats = attempts.reduce((acc: { [key: string]: any }, attempt) => {
              const mainCategory = attempt.main_category.replace(/^[A-Z]\.\s*/, '');
              const subcategory = attempt.subcategory.replace(/^[A-Z]\.\d+\.\s*/, '');

              if (!acc[mainCategory]) {
                acc[mainCategory] = {
                  name: mainCategory,
                  totalCorrect: 0,
                  totalAttempts: 0,
                  subdomains: {}
                };
              }

              const category = acc[mainCategory];
              category.totalAttempts++;
              if (attempt.is_correct) category.totalCorrect++;

              if (!category.subdomains[subcategory]) {
                category.subdomains[subcategory] = {
                  name: subcategory,
                  correct: 0,
                  total: 0,
                  lastAttempt: null
                };
              }

              const subdomain = category.subdomains[subcategory];
              subdomain.total++;
              if (attempt.is_correct) subdomain.correct++;
              subdomain.lastAttempt = attempt.created_at;

              return acc;
            }, allSubdomains);

            const result: CategoryStats[] = Object.values(categoryStats)
              .map((category: any) => ({
                name: category.name,
                percentage: Math.round((category.totalCorrect / category.totalAttempts) * 100) || 0,
                subdomains: Object.values(category.subdomains)
                  .map((sub: any) => ({
                    name: sub.name,
                    percentage: Math.round((sub.correct / sub.total) * 100) || 0,
                    total: sub.total,
                    lastAttempt: sub.lastAttempt
                  }))
                  .sort((a: any, b: any) => b.percentage - a.percentage)
              }))
              .sort((a: any, b: any) => b.percentage - a.percentage);

            setCategoryData(result);
          } catch (error: any) {
            console.error('Error fetching category data:', error);
            setError('Failed to load analytics');
          } finally {
            setLoading(false);
          }
        };

        fetchCategoryData();
      }, [user]);

      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-quiz-primary" />
          </div>
        );
      }

      if (error) {
        return (
          <Card className="p-6">
            <Alert variant="destructive">{error}</Alert>
          </Card>
        );
      }

      if (categoryData.length === 0) {
        return (
          <Card className="p-6">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium">No practice sessions found</p>
            </div>
          </Card>
        );
      }

      return (
        <div className="space-y-6">
          {categoryData.map((category, index) => (
            <Card key={index} className="overflow-hidden border-l-4 border-l-quiz-primary">
              <div 
                className="p-4 bg-quiz-primary/5 cursor-pointer flex items-center justify-between transition-colors hover:bg-quiz-primary/10"
                onClick={() => onToggleCategory(category.name)}
              >
                <div className="flex items-center gap-2">
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown className="h-5 w-5 text-quiz-primary" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-quiz-primary" />
                  )}
                  <h3 className="font-semibold text-quiz-primary">{category.name}</h3>
                </div>
                <span className="text-sm font-medium text-quiz-primary">
                  {category.percentage}%
                </span>
              </div>
              
              <div className={cn(
                "overflow-hidden transition-all duration-300",
                expandedCategories.includes(category.name) ? "max-h-[1000px]" : "max-h-0"
              )}>
                <div className="p-6 space-y-4">
                  {category.subdomains.map((subdomain, subIndex) => (
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
          ))}
        </div>
      );
    };
