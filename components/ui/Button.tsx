import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "default" | "success" | "danger" | "warning";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
}

const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}: IProps) => {
  const variantClass = {
    default: "bg-primary hover:bg-primary-200",
    success: "bg-sconderay hover:bg-green-600",
    danger: "bg-error hover:bg-red-500",
    warning: "bg-warning hover:bg-yellow-600 text-black",
  }[variant];

  return (
    <button
      className={`text-white text-center px-4 py-2 rounded-md cursor-pointer duration-300 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
