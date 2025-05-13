
import React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const aspectRatioVariants = cva("overflow-hidden", {
  variants: {
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    border: {
      none: "",
      thin: "border border-border",
      medium: "border-2 border-border",
      thick: "border-4 border-border",
    },
    responsive: {
      true: "md:aspect-[4/3] lg:aspect-[16/9]", // Different ratios at different breakpoints
      false: "",
    },
  },
  defaultVariants: {
    rounded: "none",
    border: "none",
    responsive: false,
  },
});

interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>,
    VariantProps<typeof aspectRatioVariants> {}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, rounded, border, responsive, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn(aspectRatioVariants({ rounded, border, responsive }), className)}
    {...props}
  />
));

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
