import { useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { OnboardingLayout } from "@/components/onboarding/OnboardingLayout";
    import ProfilePhotoUpload from "@/components/onboarding/ProfilePhotoUpload";
    import { Input } from "@/components/ui/input";

    const ProfileSetupPage = () => {
      const navigate = useNavigate();

      return (
        <OnboardingLayout progress={66}>
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-quiz-primary"
            >
              Build Your Profile
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-quiz-text"
            >
              Add a photo and tell us a bit about yourself.
            </motion.p>
            <div className="space-y-4">
              <ProfilePhotoUpload />
              <Input placeholder="Name" className="bg-quiz-input border-quiz-primary/20" />
              <Input placeholder="Short bio (optional)" className="bg-quiz-input border-quiz-primary/20" />
              <p className="text-sm italic text-quiz-text">You can edit this later!</p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                onClick={() => navigate("/onboarding/supervisor-connection")}
                className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
              >
                Next: Connect with Your Supervisor →
              </Button>
            </motion.div>
          </div>
        </OnboardingLayout>
      );
    };

    export default ProfileSetupPage;
