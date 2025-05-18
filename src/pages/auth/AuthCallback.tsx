
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');
      
      if (code) {
        try {
          console.log("Processing auth callback with code");
          
          // Let Supabase handle the exchange of the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Exchange code error:", error);
            setError(error.message);
            toast.error(error.message || "Authentication failed");
            setTimeout(() => navigate('/login'), 3000);
            return;
          }
          
          // Check if user is authenticated
          if (data?.session?.user) {
            console.log("Authentication successful, redirecting...");
            
            // Redirect based on user role
            if (data.session.user.user_metadata?.is_seller) {
              navigate('/seller/dashboard');
            } else {
              navigate('/dashboard');
            }
          } else {
            console.log("No session found after code exchange");
            setError("Authentication failed. Please try again.");
            setTimeout(() => navigate('/login'), 3000);
          }
        } catch (error: any) {
          console.error('Error handling auth callback:', error);
          setError(error?.message || "An error occurred during authentication");
          setTimeout(() => navigate('/login'), 3000);
        }
      } else {
        setError("No authentication code found. Please try logging in again.");
        setTimeout(() => navigate('/login'), 3000);
      }
      
      setLoading(false);
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {loading ? (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-zwm-primary mx-auto mb-4" />
              <p className="text-lg font-medium">Completing your sign-in...</p>
              <p className="mt-2 text-sm text-gray-500">Please wait while we verify your credentials.</p>
            </>
          ) : error ? (
            <>
              <div className="h-12 w-12 mx-auto mb-4 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-red-600">Authentication Error</p>
              <p className="mt-2 text-sm text-gray-500">{error}</p>
              <p className="mt-4 text-sm text-gray-500">Redirecting you to the login page...</p>
            </>
          ) : (
            <>
              <div className="h-12 w-12 mx-auto mb-4 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg font-medium text-green-600">Authentication Successful</p>
              <p className="mt-2 text-sm text-gray-500">Redirecting you to the dashboard...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
