import { useState } from "react";
    import { Card } from "@/components/ui/card";
    import { AuthForm } from "@/components/auth/AuthForm";
    import { useAuthForm } from "@/hooks/useAuthForm";
    import { motion } from "framer-motion";

    const Auth = () => {
      const [isLogin, setIsLogin] = useState(true);
      const { authState, handleInputChange, handleAuth } = useAuthForm();

      return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl font-bold text-quiz-primary">
                {isLogin ? "Welcome Back!" : "Start Your Journey"}
              </h1>
              {!isLogin && (
                <p className="text-sm text-quiz-text mt-2">
                  Join our community of successful BCBA candidates and professionals.
                </p>
              )}
            </motion.div>
            
            <AuthForm
              isLogin={isLogin}
              authState={authState}
              onInputChange={handleInputChange}
              onSubmit={() => handleAuth(isLogin)}
            />

            <p className="mt-4 text-center text-sm text-quiz-text">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-quiz-primary hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </Card>
        </div>
      );
    };

    export default Auth;
