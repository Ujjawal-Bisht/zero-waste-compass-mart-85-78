
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";

export const useUserProfile = () => {
  const fetchUserProfile = async (userId: string, currentUser: User | null) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return currentUser;
      }

      if (data && currentUser) {
        const updatedUser: User = {
          ...currentUser,
          displayName: data.display_name || currentUser.displayName,
          photoURL: data.avatar_url || currentUser.photoURL,
          isSeller: data.is_seller || currentUser.isSeller || false,
          isAdmin: data.is_admin || currentUser.isAdmin || false
        };
        return updatedUser;
      }
      
      return currentUser;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return currentUser;
    }
  };

  return { fetchUserProfile };
};
