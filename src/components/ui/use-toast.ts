
import { toast as sonnerToast } from "sonner";

// Export a consistent hook for toast functionality
export const useToast = () => {
  return {
    toast: sonnerToast
  };
};

// Also export the toast function directly for convenience
export const toast = sonnerToast;
