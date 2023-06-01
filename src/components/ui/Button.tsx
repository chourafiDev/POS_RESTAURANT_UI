import { VariantProps, cva } from "class-variance-authority";
// import classNames from "clas"
import { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-md reltive text-sm font-medium w-full",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand/90 duration-200 ease-in",
        outline: "border border-gray-light text-dark hover:bg-gray-light/50 duration-200 ease-in",
        destructive: "bg-red text-white",
      },
      size: {
        default: "py-3 px-4",
        sm: "py-2 px-2",
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
