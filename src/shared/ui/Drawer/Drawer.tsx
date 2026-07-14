import clsx from "clsx";
import type { ReactNode, Ref } from "react";
import styles from "./Drawer.module.scss";

interface DrawerProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  ref?: Ref<HTMLDivElement>;
}

export const Drawer = ({ children, isSidebarOpen, ref }: DrawerProps) => {
  return (
    <div
      ref={ref}
      className={clsx(styles.drawer, isSidebarOpen && styles.drawerVisible)}
    >
      {children}
    </div>
  );
};
