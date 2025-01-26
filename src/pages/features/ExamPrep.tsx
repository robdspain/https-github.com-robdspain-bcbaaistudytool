import { motion } from "framer-motion";
import { Clock, Timer, Trophy, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ExamPrep = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Clock className="w-16 h-16 text-quiz-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-quiz-primary mb-6">
            Realistic Exam Preparation
          </h1>
          <p className="text-xl text-quiz-text max-w-3xl mx-auto">
            Practice in an environment that mirrors the actual BCBA exam experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <Timer className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Timed Practice Sessions
                </h3>
                <p className="text-quiz-text">
                  Build time management skills with practice sessions that simulate real exam conditions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Trophy className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Performance Analytics
                </h3>
                <p className="text-quiz-text">
                  Track your progress with detailed metrics and identify areas for improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Targeted Practice
                </h3>
                <p className="text-quiz-text">
                  Focus your study time on areas where you need the most improvement.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-quiz-primary mb-6">
              Exam Success Features
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Full-length practice exams</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Question-by-question timing analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Performance improvement tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Customizable practice sessions</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate("/pricing")}
            className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
          >
            Start Practicing Today
          </Button>
          <p className="mt-4 text-sm text-quiz-text">
            Join successful BCBA candidates who passed their exam with our platform
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ExamPrep;
