import { VariantProps, cva } from "class-variance-authority";
// import classNames from "clas"
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md reltive text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-brand text-white",
        outline: "bg-brand",
        destructive: "bg-red text-white",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
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
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
