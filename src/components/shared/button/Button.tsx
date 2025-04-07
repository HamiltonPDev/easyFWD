import styles from "./Button.module.scss";
import Link from "next/link";

interface ButtonProps {
  text?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "transparent";
  size?: "small" | "medium" | "large" | "regular" | "rounded";
  border?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  icon,
  color = "primary",
  size = "medium",
  border = false,
  href,
}: ButtonProps) => {
  if (!text && !icon) throw new Error("Button must have either text or icon");

  const content = text || icon;
  const className = `${styles.Button} ${styles[color]} ${styles[size]} ${
    border ? styles.border : ""
  }`;

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {content}
    </button>
  );
};
