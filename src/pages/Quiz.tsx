import { Quiz } from "@/components/quiz/Quiz";

    const QuizPage = () => {
      return (
        <div className="min-h-screen bg-quiz-background py-8 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto shadow-lg rounded-2xl bg-white/80 backdrop-blur-sm p-8 max-w-3xl">
            <Quiz />
          </div>
        </div>
      );
    };

    export default QuizPage;
