import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/quiz/LoadingSpinner";

interface AuthFormProps {
  isLogin: boolean;
  authState: {
    email: string;
    password: string;
    loading: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export const AuthForm = ({ isLogin, authState, onInputChange, onSubmit }: AuthFormProps) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }} className="space-y-4">
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={authState.email}
        onChange={onInputChange}
        className="bg-white"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={authState.password}
        onChange={onInputChange}
        className="bg-white"
        required
      />
      <Button 
        type="submit" 
        className="w-full bg-quiz-primary hover:bg-quiz-primary/90"
        disabled={authState.loading}
      >
        {authState.loading ? (
          <LoadingSpinner />
        ) : (
          isLogin ? "Login" : "Sign Up"
        )}
      </Button>
    </form>
  );
};
