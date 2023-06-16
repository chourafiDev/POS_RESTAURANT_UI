import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center justify-center reltive font-medium w-full",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand/90 duration-200 ease-in",
        secondary:
          "bg-gray/60 text-white hover:bg-gray/40 duration-200 ease-in",
        outline:
          "border border-brand text-brand hover:bg-brand/10 duration-200 ease-in",
        "outline-gray":
          "border border-gray/40 text-dark hover:bg-gray-light/10 duration-200 ease-in",
        destructive: "bg-red text-white hover:bg-red/90 duration-200 ease-in",
        gray: "bg-red text-white",
        white: "bg-white text-dark",
      },
      size: {
        default: "py-3 px-4 text-sm",
        sm: "py-2 px-6 text-sm",
        lg: "py-4 px-6 text-md",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

const Button = ({
  children,
  variant,
  className,
  size,
  rounded,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ variant, size, rounded, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
