import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { useToast } from "@/hooks/use-toast";
    import { supabase } from "@/integrations/supabase/client";

    interface AuthState {
      email: string;
      password: string;
      loading: boolean;
    }

    export const useAuthForm = () => {
      const [authState, setAuthState] = useState<AuthState>({
        email: "",
        password: "",
        loading: false,
      });
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthState(prev => ({ ...prev, [name]: value }));
      };

      const handleAuth = async (isLogin: boolean) => {
        try {
          setAuthState(prev => ({ ...prev, loading: true }));
          console.log(`Attempting to ${isLogin ? 'login' : 'signup'} with email:`, authState.email);

          if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: authState.email,
              password: authState.password,
            });
            
            if (error) {
              console.error("Login error details:", {
                message: error.message,
                status: error.status,
                name: error.name
              });
              
              let errorMessage = "Invalid email or password";
              if (error.message.includes("Invalid login credentials")) {
                errorMessage = "Invalid email or password. Please check your credentials and try again.";
              } else if (error.message.includes("User not found")) {
                errorMessage = "User not found. Please register an account.";
              }
              
              toast({
                title: "Login failed",
                description: errorMessage,
                variant: "destructive",
                action: {
                  label: "Sign Up",
                  onClick: () => navigate("/auth", { state: { isLogin: false } }),
                }
              });
              return;
            }

            toast({
              title: "Welcome Back!",
              description: `Welcome back, ${data.user?.email}!`,
            });
            navigate("/dashboard", { replace: true });
          } else {
            const { error } = await supabase.auth.signUp({
              email: authState.email,
              password: authState.password,
            });
            
            if (error) {
              console.error("Signup error details:", {
                message: error.message,
                status: error.status,
                name: error.name
              });
              
              let errorMessage = "Failed to create account";
              if (error.message.includes("already registered")) {
                errorMessage = "This email is already registered. Please log in instead.";
              } else if (error.message.includes("invalid email")) {
                errorMessage = "Please enter a valid email address.";
              } else if (error.message.includes("Password should be at least 6 characters")) {
                errorMessage = "Password should be at least 6 characters.";
              }
              
              toast({
                title: "Signup failed",
                description: errorMessage,
                variant: "destructive",
              });
              return;
            }

            toast({
              title: "Success!",
              description: "Please check your email to verify your account.",
            });
          }
        } catch (error: any) {
          console.error("Auth error details:", {
            message: error.message,
            status: error.status,
            name: error.name,
            stack: error.stack
          });
        } finally {
          setAuthState(prev => ({ ...prev, loading: false }));
        }
      };

      return {
        authState,
        handleInputChange,
        handleAuth,
      };
    };
