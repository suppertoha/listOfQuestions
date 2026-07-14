import { createBrowserRouter, Navigate } from "react-router-dom";
import { BaseLayout } from "@/app/layouts";
import { ROUTES } from "@/shared/config";
import { Questions } from "@/pages/questions";
import { DetailedQuestion } from "@/pages/detailed-question";
import { NotFound } from "@/pages/not-found";

export const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Questions />,
      },
      {
        path: "questions/:id",
        element: <DetailedQuestion />,
      },
      {
        path: ROUTES.notFound,
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to={ROUTES.notFound} replace />,
      },
    ],
  },
]);
