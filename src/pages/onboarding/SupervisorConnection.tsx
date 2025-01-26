import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
    import { Input } from "@/components/ui/input";
    import { Info } from "lucide-react";
    import {
      Tooltip,
      TooltipContent,
      TooltipProvider,
      TooltipTrigger,
    } from "@/components/ui/tooltip";

    const SupervisorConnectionPage = () => {
      const navigate = useNavigate();

      return (
        <OnboardingLayout progress={100}>
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-quiz-primary"
            >
              Connect with Your Supervisor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-quiz-text"
            >
              This helps us personalize your experience.
            </motion.p>
            <div className="space-y-4">
              <Input placeholder="Supervisor’s Full Name" className="bg-quiz-input border-quiz-primary/20" />
              <Input placeholder="Supervisor’s Email" type="email" className="bg-quiz-input border-quiz-primary/20" />
              <p className="text-sm text-quiz-text">We’ll send them a quick confirmation email.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <Button
                onClick={() => navigate("/onboarding/exam-details")}
                className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
              >
                Next: BCBA Exam Details →
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-quiz-text cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Need help? Contact support@example.com.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </div>
        </OnboardingLayout>
      );
    };

    export default SupervisorConnectionPage;
