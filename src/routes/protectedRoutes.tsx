import WithSuspense from "components/HOC/WithSuspense";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { PROTECTED_PATHS, PUBLIC_PATHS } from "./pagePath";

const Dashboard = WithSuspense(lazy(() => import("pages/Dashboard")));
const AddQuestion = WithSuspense(lazy(() => import("pages/AddQuestion")));
const LeaderBoard = WithSuspense(lazy(() => import("pages/LeaderBoard")));
const Question = WithSuspense(lazy(() => import("pages/Question")));

const { DASHBOARD, ADD, BOARD, QUESTION } = PROTECTED_PATHS;

const PROTECTED_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: ADD, element: <AddQuestion /> },
  { path: BOARD, element: <LeaderBoard /> },
  { path: QUESTION, element: <Question /> },
  { path: "/", element: <Navigate to={DASHBOARD} /> },
  // this enables you not to access the public routes when logged in
  ...Object.values(PUBLIC_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),
  { path: "*", element: <div>Page not found</div> },
];

export default PROTECTED_ROUTES;
