import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { AuthProvider } from "./providers/AuthProvider";
    import { TooltipProvider } from "@/components/ui/tooltip";
    import TopNav from "./components/TopNav";
    import IndexPage from "./pages/Index";
    import Auth from "./pages/Auth";
    import DashboardPage from "./pages/Dashboard";
    import QuestionsPage from "./pages/Questions";
    import PacingGuidePage from "./pages/PacingGuide";
    import ResultsPage from "./pages/Results";
    import ProfilePage from "./pages/Profile";
    import PricingPage from "./pages/Pricing";
    import WelcomePage from "./pages/onboarding/Welcome";
    import ProfileSetupPage from "./pages/onboarding/ProfileSetup";
    import SupervisorConnectionPage from "./pages/onboarding/SupervisorConnection";
    import ExamDetailsPage from "./pages/onboarding/ExamDetails";
    import ConfirmationPage from "./pages/onboarding/Confirmation";

    const queryClient = new QueryClient();

    function App() {
      return (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Router>
                <TopNav />
                <Routes>
                  <Route path="/" element={<IndexPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/quiz" element={<QuestionsPage />} />
                  <Route path="/pacing-guide" element={<PacingGuidePage />} />
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/onboarding/welcome" element={<WelcomePage />} />
                  <Route path="/onboarding/profile-setup" element={<ProfileSetupPage />} />
                  <Route path="/onboarding/supervisor-connection" element={<SupervisorConnectionPage />} />
                  <Route path="/onboarding/exam-details" element={<ExamDetailsPage />} />
                  <Route path="/onboarding/confirmation" element={<ConfirmationPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      );
    }

    export default App;
