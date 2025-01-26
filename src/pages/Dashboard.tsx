import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { ChartBar, Calendar, BookOpen } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-quiz-primary mb-8">Welcome to Your Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-quiz-primary" />
              <CardTitle className="text-quiz-primary">Practice Quiz</CardTitle>
            </div>
            <CardDescription>Test your knowledge with practice questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/quiz")}
              className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-quiz-primary" />
              <CardTitle className="text-quiz-primary">Pacing Guide</CardTitle>
            </div>
            <CardDescription>Track your study progress and schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/pacing-guide")}
              className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
            >
              View Guide
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ChartBar className="w-5 h-5 text-quiz-primary" />
              <CardTitle className="text-quiz-primary">Results</CardTitle>
            </div>
            <CardDescription>Review your quiz performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate("/results")}
              className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
            >
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
