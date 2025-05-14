
import { toast as sonnerToast } from "sonner";
import type { ToasterProps } from "sonner";

// Define the type for our toast function parameters
interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number;
}

// Export a consistent hook for toast functionality
export const useToast = () => {
  const toast = ({ title, description, duration, ...props }: ToastProps) => {
    return sonnerToast(title, {
      description,
      duration,
      ...props
    });
  };

  return {
    toast
  };
};

// Also export the toast function directly for convenience
export const toast = ({ title, description, duration, ...props }: ToastProps) => {
  return sonnerToast(title, {
    description,
    duration,
    ...props
  });
};
