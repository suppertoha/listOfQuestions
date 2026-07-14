import { DetailedBrowserSkeleton } from "@/widgets/detailed-question-browser";
import { DetailedSidebarSkeleton } from "@/widgets/detailed-question-sidebar";
import styles from "./Page.module.scss";
import skeletonStyles from "./DetailedPageSkeleton.module.scss";

interface DetailedPageSkeletonProps {
  isMobile?: boolean;
}

export const DetailedPageSkeleton = ({
  isMobile = false,
}: DetailedPageSkeletonProps) => {
  return (
    <section className={styles.page}>
      <div className={skeletonStyles.back} />

      <div className={styles.content}>
        <main className={styles.main}>
          <DetailedBrowserSkeleton isMobile={isMobile} />
        </main>

        {!isMobile && <DetailedSidebarSkeleton />}
      </div>
    </section>
  );
};
