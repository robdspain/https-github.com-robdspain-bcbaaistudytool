import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
    import { CheckCircle } from "lucide-react";

    const ConfirmationPage = () => {
      const navigate = useNavigate();

      return (
        <OnboardingLayout progress={100}>
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-20 h-20 text-quiz-primary mx-auto mb-4" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-quiz-primary"
            >
              You’re All Set! 🎉
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-quiz-text"
            >
              You can always edit these details in your profile.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={() => navigate("/profile")}
                variant="outline"
              >
                Edit Profile
              </Button>
            </motion.div>
          </div>
        </OnboardingLayout>
      );
    };

    export default ConfirmationPage;
