import { useCallback, useState } from "react";
import { QuestionsBrowser } from "@/widgets/questions-browser";
import { QuestionsFilters } from "@/widgets/questions-filters";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import { useCheckMobile } from "@/shared/hooks/useCheckMobile";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { CloseButton, Drawer } from "@/shared/ui";
import styles from "./Page.module.scss";

export const Questions = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);
  const onDesktopTransition = useCallback(() => setIsSidebarOpen(false), []);

  const isMobile = useCheckMobile({
    breakpoint: 992,
    onDesktopTransition,
  });

  useBodyScrollLock(isSidebarOpen && isMobile);

  const openSidebar = () => setIsSidebarOpen(true);
  const drawerRef = useClickOutside(closeSidebar);

  return (
    <section className={styles.page}>
      <main className={styles.main}>
        <QuestionsBrowser isMobile={isMobile} openSidebar={openSidebar} />
      </main>

      {isMobile ? (
        <Drawer ref={drawerRef} isSidebarOpen={isSidebarOpen}>
          <CloseButton onClose={closeSidebar} />
          <QuestionsFilters />
        </Drawer>
      ) : (
        <aside className={styles.sidebar}>
          <QuestionsFilters />
        </aside>
      )}
    </section>
  );
};
