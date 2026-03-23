import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { login, setAuthToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Password is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await login(password);
      if (result && result.token) {
        setAuthToken(result.token, result.expiresAt);
        // Navigate to profile on success
        navigate("/admin/profile");
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
      <div className="w-full text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-app-bg border border-app-border rounded-full mb-6 flex items-center justify-center">
          <Lock size={24} className="text-app-accent" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold tracking-widest uppercase text-app-text-primary mb-2">Authentication Required</h1>
        <p className="text-app-muted text-sm uppercase tracking-wider">Please enter the administrator password</p>
      </div>

      <form onSubmit={handleLogin} className="w-full space-y-6">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-app-bg border-b-2 border-app-border focus:border-app-accent px-4 py-3 text-app-text-primary placeholder:text-app-muted text-center tracking-widest uppercase text-sm transition-colors outline-none rounded-none focus:bg-app-accent/5"
            placeholder="PASSWORD"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="text-red-500 text-xs text-center uppercase tracking-widest font-bold">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-app-accent text-app-bg hover:bg-app-text-primary px-6 py-4 transition-colors font-bold uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-2 group"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">Authenticating...</span>
          ) : (
            <>
              Access Terminal
              <LogIn size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
