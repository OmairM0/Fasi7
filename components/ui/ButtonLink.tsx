import Link from "next/link";

interface IProps {
  title: string;
  href: string;
  variant?: "default" | "button";
  icon?: React.ReactNode;
}

const ButtonLink = ({ href, title, variant = "default", icon }: IProps) => {
  const variantClass = {
    default: "text-turquoise hover:text-secondary",
    button:
      "text-white text-center px-4 py-2 rounded-md cursor-pointer duration-300 bg-primary hover:bg-primary-200",
  }[variant];

  return (
    <Link
      href={href}
      className={`flex items-center justify-between ${variantClass}`}
    >
      {title}
      {icon && <span className="ms-2">{icon}</span>}
    </Link>
  );
};

export default ButtonLink;
