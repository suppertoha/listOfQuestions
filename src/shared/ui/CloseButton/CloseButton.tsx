import CloseMenu from "@/shared/assets/icons/close-menu.svg?react";
import styles from "./CloseButton.module.scss";

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <button
      type="button"
      className={styles.closeBtn}
      onClick={onClose}
      aria-label="Закрыть"
    >
      <CloseMenu />
    </button>
  );
};
