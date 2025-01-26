import { useNavigate } from "react-router-dom";
    import { useAuth } from "@/providers/AuthProvider";
    import { Button } from "@/components/ui/button";
    import { motion } from "framer-motion";
    import { Brain, Clock, Users, BookOpen, BarChart, Sparkles, ShieldCheck } from "lucide-react";
    import { ExampleGraphs } from "@/components/ExampleGraphs";

    const Index = () => {
      const { user } = useAuth();
      const navigate = useNavigate();

      const features = [
        {
          icon: <Brain className="w-12 h-12 text-quiz-primary" />,
          title: "Smart Question Generation",
          description: "AI-powered system creates personalized BCBA-style questions tailored to your needs.",
          points: ["Customized practice quizzes", "Adaptive learning focus", "Instant feedback"],
          link: "/features/smart-questions"
        },
        {
          icon: <BookOpen className="w-12 h-12 text-quiz-primary" />,
          title: "Comprehensive Coverage",
          description: "Complete coverage of ALL BCBA exam topics aligned with latest BACB guidelines.",
          points: ["Detailed ABA principles", "5th Edition Task List aligned", "Vast question library"],
          link: "/features/comprehensive-coverage"
        },
        {
          icon: <Clock className="w-12 h-12 text-quiz-primary" />,
          title: "Exam Preparation",
          description: "Simulate real exam experience with timed practice and progress tracking.",
          points: ["Timed practice modes", "Performance tracking", "Realistic simulations"],
          link: "/features/exam-prep"
        },
        {
          icon: <ShieldCheck className="w-12 h-12 text-quiz-primary" />,
          title: "Ethical Practice Scenarios",
          description: "Practice with real-world ethical dilemmas to ensure you're prepared for any situation.",
          points: ["Ethical decision-making", "Scenario-based questions", "Professional conduct"],
          link: "/features/ethical-practice"
        },
      ];

      const testimonials = [
        {
          quote: "I struggled to stay organized until I found this tool! The personalized quizzes and mentorship features are a game-changer!",
          author: "Sarah M.",
          title: "BCBA Candidate"
        },
        {
          quote: "The instant feedback and comprehensive coverage make this the best study tool out there. Highly recommend!",
          author: "David P.",
          title: "School-Based Behavior Analyst"
        }
      ];

      return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-left md:text-left md:w-1/2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-quiz-primary mb-6"
                >
                  Ace Your BCBA Exam with Confidence
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-quiz-text mb-8 max-w-2xl"
                >
                  The Easy Way to Study, Refresh Your Knowledge, and Create Training Materials – All in One Place!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={() => navigate(user ? "/quiz" : "/auth")}
                    className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto"
                  >
                    Start Your Success Journey
                  </Button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden md:block md:w-1/2 shadow-lg relative"
              >
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-quiz-text text-center text-xl font-bold">Ace BCB exam with confidence</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-quiz-primary text-center mb-12">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(feature.link)}
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-quiz-primary mb-2">{feature.title}</h3>
                    <p className="text-quiz-text mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.points.map((point) => (
                        <li key={point} className="flex items-center text-quiz-text">
                          <BarChart className="w-4 h-4 mr-2 text-quiz-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Track Your Progress Section */}
          <section className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-quiz-primary text-center mb-4">
                Track Your Progress
              </h2>
              <p className="text-center text-quiz-text mb-8">
                Visualize your progress and identify areas for improvement.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <ExampleGraphs />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-quiz-primary text-center mb-12">
                What Our Users Say
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.author}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-6 bg-gray-50 rounded-lg"
                  >
                    <p className="text-lg text-quiz-text italic mb-4">"{testimonial.quote}"</p>
                    <div className="font-semibold text-quiz-primary">— {testimonial.author}</div>
                    <div className="text-sm text-quiz-text">{testimonial.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-quiz-primary mb-6">
                Get Started Today!
              </h2>
              <p className="text-quiz-text mb-8">
                Don't waste time with outdated study methods—join thousands of BCBA candidates and professionals who trust our platform to help them succeed.
              </p>
              <div className="space-y-4">
                <Button
                  onClick={() => navigate("/pricing")}
                  className="bg-quiz-primary hover:bg-quiz-primary/90 text-white px-8 py-6 text-lg h-auto w-full md:w-auto"
                >
                  View Pricing Plans
                </Button>
              </div>
              <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-quiz-text">
                <span>✓ 100% Satisfaction Guarantee</span>
                <span className="hidden md:inline">•</span>
                <span>✓ Simple Pricing, No Surprises</span>
                <span className="hidden md:inline">•</span>
                <span>✓ Cancel Anytime</span>
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default Index;
