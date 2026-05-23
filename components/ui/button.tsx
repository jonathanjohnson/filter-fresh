import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("ff-btn", {
  variants: {
    variant: {
      default: "ff-btn--primary",
      primary: "ff-btn--primary",
      ghost: "ff-btn--ghost",
      text: "ff-btn--text",
      destructive: "ff-btn--primary !bg-destructive",
      outline: "ff-btn--ghost",
      link: "ff-btn--text",
    },
    size: {
      default: "",
      sm: "ff-btn--sm",
      lg: "ff-btn--lg",
      icon: "!w-12 !p-0 justify-center",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };
