
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');
      
      if (code) {
        try {
          // Let Supabase handle the exchange of the code for a session
          await supabase.auth.exchangeCodeForSession(code);
          
          // Check if user is a seller and redirect accordingly
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user?.user_metadata?.is_seller) {
            navigate('/seller/dashboard');
          } else {
            navigate('/dashboard');
          }
        } catch (error) {
          console.error('Error handling auth callback:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-zwm-primary" />
      <p className="mt-4 text-lg">Logging you in...</p>
    </div>
  );
};

export default AuthCallback;
