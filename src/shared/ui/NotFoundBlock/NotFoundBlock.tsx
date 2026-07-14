import type { ReactNode } from "react";
import styles from "./NotFoundBlock.module.scss";

interface NotFoundBlockProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const NotFoundBlock = ({
  title,
  description,
  children,
}: NotFoundBlockProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {children}
    </div>
  );
};