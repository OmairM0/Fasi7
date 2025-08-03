import Link from "next/link";

interface IProps {
  title: string;
  href: string;
  variant?: "default" | "button";
}

const ButtonLink = ({ href, title, variant = "default" }: IProps) => {
  const variantClass = {
    default: "text-turquoise hover:text-secondary",
    button:
      "text-white text-center px-4 py-2 rounded-md cursor-pointer duration-300 bg-primary hover:bg-primary-200",
  }[variant];

  return (
    <Link href={href} className={`${variantClass}`}>
      {title}
    </Link>
  );
};

export default ButtonLink;
