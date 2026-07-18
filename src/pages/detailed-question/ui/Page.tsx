import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetchQuestionByIdQuery } from "@/entities/question";
import { DetailedQuestionBrowser } from "@/widgets/detailed-question-browser";
import { DetailedQuestionSidebar } from "@/widgets/detailed-question-sidebar";
import { ExpertCard } from "@/widgets/expert-card";
import { ROUTES } from "@/shared/config";
import ArrowLeft from "@/shared/assets/icons/arrow-left.svg?react";
import { useBodyScrollLock } from "@/shared/hooks/useBodyScrollLock";
import { useCheckMobile } from "@/shared/hooks/useCheckMobile";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { CloseButton, Drawer } from "@/shared/ui";
import { useQuestionNavigation } from "../model/useQuestionNavigation";
import { DetailedPageSkeleton } from "./DetailedPageSkeleton";
import styles from "./Page.module.scss";

export const DetailedQuestion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const questionId = Number(id);

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

  const { data, isLoading, error } = useFetchQuestionByIdQuery(questionId, {
    skip: !id || Number.isNaN(questionId),
  });

  const { hasPrev, hasNext, goPrev, goNext, isNavigating } =
    useQuestionNavigation(questionId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [questionId]);

  if (!id || Number.isNaN(questionId)) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  if (isLoading) return <DetailedPageSkeleton isMobile={isMobile} />;

  if (error || !data) {
    return <Navigate to={ROUTES.notFound} replace />;
  }

  return (
    <section className={styles.page}>
      <button
        type="button"
        className={styles.backBtn}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft />
        <span>Назад</span>
      </button>

      <div className={styles.content}>
        <main className={styles.main}>
          <DetailedQuestionBrowser
            question={data}
            isMobile={isMobile}
            openSidebar={openSidebar}
            hasPrev={hasPrev}
            hasNext={hasNext}
            isNavigating={isNavigating}
            onPrev={goPrev}
            onNext={goNext}
          />
        </main>

        {isMobile ? (
          <Drawer
            ref={drawerRef}
            isSidebarOpen={isSidebarOpen}
            onClose={closeSidebar}
          >
            <CloseButton onClose={closeSidebar} />
            <div className={styles.sidebarColumn}>
              <DetailedQuestionSidebar question={data} />
              <ExpertCard />
            </div>
          </Drawer>
        ) : (
          <aside className={styles.sidebar}>
            <DetailedQuestionSidebar question={data} />
            <ExpertCard />
          </aside>
        )}
      </div>
    </section>
  );
};
