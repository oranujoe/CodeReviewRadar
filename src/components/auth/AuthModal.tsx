import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp, signIn } = useAuth();

  const extractErrorMessage = (err: any): string => {
    // Check if it's a Supabase error with a body property
    if (err?.body) {
      try {
        const parsedBody = typeof err.body === 'string' ? JSON.parse(err.body) : err.body;
        if (parsedBody?.message) {
          return parsedBody.message;
        }
      } catch (parseError) {
        // If parsing fails, fall back to the original body if it's a string
        if (typeof err.body === 'string') {
          return err.body;
        }
      }
    }
    
    // Check for standard error message
    if (err?.message) {
      return err.message;
    }
    
    // Check if it's an Error instance
    if (err instanceof Error) {
      return err.message;
    }
    
    // Fallback to generic message
    return 'An error occurred';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[--vc-surface] border-4 border-[--vc-border] rounded-none p-8 w-full max-w-md relative shadow-[8px_8px_0px_0px_rgba(100,0,255,0.5)]">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-300">
            {isSignUp 
              ? 'Join VibeCodeReview Radar to start analyzing your PRs' 
              : 'Sign in to access your dashboard'
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border-2 border-red-500 rounded-none flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-red-200 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[--vc-bg] border-2 border-[--vc-border] text-white placeholder-slate-400 focus:border-[--vc-primary] focus:outline-none transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[--vc-bg] border-2 border-[--vc-border] text-white placeholder-slate-400 focus:border-[--vc-primary] focus:outline-none transition-colors"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <User className="h-5 w-5" />
                {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-300">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={toggleMode}
              className="text-[--vc-primary] hover:text-[--vc-accent] font-medium transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;