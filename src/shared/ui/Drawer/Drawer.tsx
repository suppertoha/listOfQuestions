import clsx from "clsx";
import { useEffect, type ReactNode, type Ref } from "react";
import styles from "./Drawer.module.scss";

interface DrawerProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  onClose: () => void; 
  ref?: Ref<HTMLDivElement>;
}

export const Drawer = ({ children, isSidebarOpen, onClose, ref }: DrawerProps) => {
  useEffect(() => {
    if (!isSidebarOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen, onClose]);

  return (
    <div 
      ref={ref}
      className={clsx(styles.drawer, isSidebarOpen && styles.open)}
      role="dialog"      
      aria-modal="true"  
      aria-hidden={!isSidebarOpen} 
    >
      {children}
    </div>
  );
};
