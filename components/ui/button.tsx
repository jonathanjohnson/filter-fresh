import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Primary: CTA gradient, white text, pill shape, soft hover shadow.
        default:
          "bg-cta-gradient text-white shadow-sm hover:shadow-btn-hover hover:brightness-105 active:brightness-95",
        // Secondary: white surface, navy 1.5px outline, navy text, same pill shape.
        outline:
          "bg-card text-primary-navy border-[1.5px] border-primary-navy hover:bg-muted",
        // Ghost: transparent with navy text, used inside cards.
        ghost: "bg-transparent text-primary-navy hover:bg-muted",
        // Destructive uses the semantic destructive token.
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90",
        // Link variant for inline use.
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 rounded-pill px-5 text-sm",
        default: "h-12 rounded-pill px-8 text-sm",
        lg: "h-14 rounded-pill px-8 text-base",
        icon: "h-12 w-12 rounded-pill",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = "Button";

export { buttonVariants };
