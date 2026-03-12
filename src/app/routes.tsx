import { createBrowserRouter } from "react-router";
import { UserLayout } from "./layouts/UserLayout";
import { UserDashboard } from "./pages/user/Dashboard";
import { UserNutrition } from "./pages/user/Nutrition";
import { UserCalendar } from "./pages/user/Calendar";
import { UserProfile } from "./pages/user/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UserLayout,
    children: [
      { index: true, Component: UserDashboard },
      { path: "nutrition", Component: UserNutrition },
      { path: "calendar", Component: UserCalendar },
      { path: "profile", Component: UserProfile },
    ],
  },
]);