import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "transparent";
  size?: "small" | "medium" | "large";
}

export const Button = ({
  text,
  onClick,
  color = "primary",
  size = "medium",
}: ButtonProps) => {
  return (
    <button
      className={`${styles.Button} ${styles[color]} ${styles[size]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
