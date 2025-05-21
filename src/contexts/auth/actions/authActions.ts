
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const authActions = {
  login: async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) throw error;
    
    toast.success("Logged in successfully!");
  },

  googleLogin: async (accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    console.log(`Starting Google authentication flow as ${accountType}...`);
    
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          is_seller: accountType === 'seller' ? 'true' : 'false'
        }
      },
    });
    
    if (error) throw error;
  },

  phoneLogin: async (phoneNumber: string, accountType: 'buyer' | 'seller' = 'buyer'): Promise<void> => {
    const { error } = await supabase.auth.signInWithOtp({ 
      phone: phoneNumber,
      options: {
        data: { is_seller: accountType === 'seller' }
      }
    });
    
    if (error) throw error;
    
    toast.success("OTP sent to your phone number!");
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    
    if (error) throw error;
    
    toast.success("Logged out successfully!");
  },

  register: async (
    email: string, 
    password: string, 
    name: string, 
    businessDetails?: { 
      businessName?: string, 
      businessType?: 'retailer' | 'distributor' | 'manufacturer' | 'individual',
      isSeller?: boolean 
    }
  ): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          is_seller: businessDetails?.isSeller || false,
          business_name: businessDetails?.businessName,
          business_type: businessDetails?.businessType,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    if (error) throw error;
    
    // If isSeller is true, update the profile
    if (businessDetails?.isSeller && data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_seller: true })
        .eq('id', data.user.id);
        
      if (profileError) {
        console.error("Error updating profile:", profileError);
      }
      
      // Create a seller profile if needed
      if (businessDetails.businessName && businessDetails.businessType) {
        const { error: sellerProfileError } = await supabase
          .from('seller_profiles')
          .insert({
            id: data.user.id,
            business_name: businessDetails.businessName,
            business_type: businessDetails.businessType,
          });
          
        if (sellerProfileError) {
          console.error("Error creating seller profile:", sellerProfileError);
        }
      }
    }
    
    toast.success("Registration successful! Please check your email for verification.");
  },

  resetPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) throw error;
    
    toast.success("Password reset instructions sent to your email!");
  },

  updateProfile: async (currentUser: User | null, data: Partial<User>): Promise<User | null> => {
    if (!currentUser) throw new Error("No authenticated user");
    
    // Update user metadata if needed
    if (data.displayName || data.photoURL) {
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: data.displayName,
          avatar_url: data.photoURL,
        }
      });
      
      if (authError) throw authError;
    }
    
    // Update profile in the profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        display_name: data.displayName,
        avatar_url: data.photoURL,
        is_seller: data.isSeller,
      })
      .eq('id', currentUser.id);
      
    if (profileError) throw profileError;
    
    // Return the updated user
    const updatedUser = {
      ...currentUser,
      ...data
    };
    
    toast.success("Profile updated successfully!");
    return updatedUser;
  },

  verifySellerAccount: async (currentUser: User | null, businessDocuments: File[]): Promise<void> => {
    if (!currentUser) throw new Error("No authenticated user");
    
    // Upload documents to storage (in a real implementation)
    console.log("Processing seller verification documents:", businessDocuments.length, "files submitted");
    
    // Update seller profile verification status
    const { error } = await supabase
      .from('seller_profiles')
      .update({ 
        verified: false // Set to pending in a real implementation
      })
      .eq('id', currentUser.id);
      
    if (error) throw error;
    
    toast.success("Seller account verification request submitted successfully!");
  },
};
