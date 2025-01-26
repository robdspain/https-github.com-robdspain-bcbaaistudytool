import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";

    const WelcomePage = () => {
      const navigate = useNavigate();

      return (
        <OnboardingLayout progress={33}>
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-quiz-primary"
            >
              Welcome to Behavior Study Tools! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-quiz-text"
            >
              Let’s get you set up in 3 quick steps.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => navigate("/onboarding/profile-setup")}
                className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </OnboardingLayout>
      );
    };

    export default WelcomePage;
