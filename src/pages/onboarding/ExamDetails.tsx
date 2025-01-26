import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
    import { Input } from "@/components/ui/input";

    const ExamDetailsPage = () => {
      const navigate = useNavigate();

      return (
        <OnboardingLayout progress={100}>
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-quiz-primary"
            >
              Preparing for the BCBA Exam?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-quiz-text"
            >
              Let us help you stay on track!
            </motion.p>
            <div className="space-y-4">
              <Input type="date" placeholder="Expected Exam Date" className="bg-quiz-input border-quiz-primary/20" />
              <p className="text-sm text-quiz-text">Don’t worry—you can update this date anytime.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => navigate("/onboarding/confirmation")}
                className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
              >
                Finish Setup →
              </Button>
            </motion.div>
          </div>
        </OnboardingLayout>
      );
    };

    export default ExamDetailsPage;
