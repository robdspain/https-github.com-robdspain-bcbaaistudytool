import { Link, useNavigate } from "react-router-dom";
    import { Button } from "@/components/ui/button";
    import { LogOut, User, LayoutDashboard } from "lucide-react";
    import { useAuth } from "@/providers/AuthProvider";
    import { cn } from "@/lib/utils";

    const TopNav = () => {
      const { user, signOut } = useAuth();
      const navigate = useNavigate();

      if (!user) {
        return (
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center border-b border-quiz-text/20 shadow-sm">
                <Link to="/" className="text-xl font-semibold text-quiz-primary">
                  Behavior Study Tools
                </Link>
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-quiz-text hover:text-white hover:bg-quiz-primary"
                    onClick={() => navigate("/pricing")}
                  >
                    Pricing
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-quiz-text hover:text-white hover:bg-quiz-primary"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-quiz-text hover:text-white hover:bg-quiz-primary"
                    onClick={() => navigate("/auth")}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        );
      }

      return (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center border-b border-quiz-text/20 shadow-sm">
              <Link to="/" className="text-xl font-semibold text-quiz-primary">
                Behavior Study Tools
              </Link>
              <div className="flex gap-4 items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 text-quiz-text hover:text-white hover:bg-quiz-primary",
                    "data-[active=true]:bg-quiz-accent/20 data-[active=true]:text-quiz-primary"
                  )}
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 text-quiz-text hover:text-white hover:bg-quiz-primary",
                    "data-[active=true]:bg-quiz-accent/20 data-[active=true]:text-quiz-primary"
                  )}
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 text-quiz-text hover:text-white hover:bg-quiz-primary"
                  onClick={() => {
                    console.log("Logging out...");
                    signOut();
                    navigate("/auth");
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>
      );
    };

    export default TopNav;
