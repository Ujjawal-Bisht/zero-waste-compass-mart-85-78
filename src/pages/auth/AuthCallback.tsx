import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import TwoFactorVerification from '@/components/auth/two-factor/TwoFactorVerification';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { searchParams } = new URL(window.location.href);
      const code = searchParams.get('code');
      
      if (code) {
        try {
          // Let Supabase handle the exchange of the code for a session
          await supabase.auth.exchangeCodeForSession(code);
          
          // Check if user is authenticated and if they need 2FA
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            // Check if user has 2FA enabled
            const { data: twoFactorData } = await supabase
              .from('two_factor_auth')
              .select('is_enabled')
              .eq('user_id', session.user.id)
              .single();
            
            // If 2FA is enabled, show the 2FA verification screen
            if (twoFactorData?.is_enabled) {
              setUserEmail(session.user.email || '');
              setNeedsTwoFactor(true);
              setLoading(false);
              return;
            }
            
            // Otherwise, redirect based on user role
            if (session.user.user_metadata?.is_seller) {
              navigate('/seller/dashboard');
            } else {
              navigate('/dashboard');
            }
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error handling auth callback:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    };
    
    handleAuthCallback();
  }, [navigate]);

  const handleVerify = async (code: string): Promise<boolean> => {
    // In a real app, this would verify the code against the server
    // For this example, we'll accept any 6-digit code
    if (/^\d{6}$/.test(code)) {
      // Get current user information
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.user_metadata?.is_seller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/dashboard');
      }
      return true;
    }
    return false;
  };

  const handleCancel = () => {
    // Sign out if user cancels 2FA
    supabase.auth.signOut().then(() => {
      navigate('/login');
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-zwm-primary" />
        <p className="mt-4 text-lg">Logging you in...</p>
      </div>
    );
  }

  if (needsTwoFactor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <TwoFactorVerification
            onVerify={handleVerify}
            onCancel={handleCancel}
            email={userEmail}
          />
        </div>
      </div>
    );
  }

  return null; // Will be redirected by the effect
};

export default AuthCallback;
