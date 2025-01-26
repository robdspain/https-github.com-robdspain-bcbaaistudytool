import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Library, Bookmark, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ComprehensiveCoverage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <BookOpen className="w-16 h-16 text-quiz-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-quiz-primary mb-6">
            Complete BCBA Exam Coverage
          </h1>
          <p className="text-xl text-quiz-text max-w-3xl mx-auto">
            Master every aspect of the BCBA exam with our comprehensive study materials
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
              <Library className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Extensive Content Library
                </h3>
                <p className="text-quiz-text">
                  Access thousands of practice questions covering every topic in the BACB Task List, ensuring you're fully prepared for the exam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <GraduationCap className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Expert-Verified Content
                </h3>
                <p className="text-quiz-text">
                  All content is reviewed by certified BCBAs to ensure accuracy and alignment with current exam standards.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Bookmark className="w-8 h-8 text-quiz-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-quiz-primary mb-2">
                  Updated Task List Coverage
                </h3>
                <p className="text-quiz-text">
                  Stay current with materials that reflect the latest BACB Task List changes and exam requirements.
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
              Complete Topic Coverage
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Measurement, Data Display, and Interpretation</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Experimental Design</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Behavior Assessment</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Behavior Change Procedures</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-quiz-secondary" />
                <span className="text-quiz-text">Personnel Supervision and Management</span>
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
            Explore Our Complete Coverage
          </Button>
          <p className="mt-4 text-sm text-quiz-text">
            Get access to our entire question bank and study materials
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveCoverage;
