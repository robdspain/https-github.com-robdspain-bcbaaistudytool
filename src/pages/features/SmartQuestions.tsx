import { motion } from "framer-motion";
import { Brain, Sparkles, Target, Zap, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SmartQuestions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Brain className="w-16 h-16 text-quiz-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-quiz-primary mb-6">
            Smart Question Generation
          </h1>
          <p className="text-xl text-quiz-text max-w-3xl mx-auto">
            Experience the future of BCBA exam preparation with our AI-powered question engine
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
              <Sparkles className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Adaptive Learning Technology
                </h3>
                <p className="text-quiz-text">
                  Our AI analyzes your performance in real-time to generate questions that target your weak areas, ensuring efficient and effective study sessions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Target className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Personalized Question Bank
                </h3>
                <p className="text-quiz-text">
                  Unlike static question banks, our system creates unique questions tailored to your knowledge level and learning style.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <BarChart className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Real-time Performance Analytics
                </h3>
                <p className="text-quiz-text">
                  Track your progress with detailed analytics that show your improvement over time and highlight areas needing attention.
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
              Why Our Smart Questions Are Different
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">GPT-4 powered question generation</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Detailed explanations for every answer</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Questions aligned with latest BACB guidelines</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Instant feedback and learning suggestions</span>
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
            Start Your Journey Today
          </Button>
          <p className="mt-4 text-sm text-quiz-text">
            Join thousands of successful BCBA candidates
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SmartQuestions;
