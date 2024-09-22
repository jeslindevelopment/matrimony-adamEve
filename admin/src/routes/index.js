import { Navigate, useRoutes } from "react-router-dom";
// layouts
import AuthLayout from "../layout/auth";
// import Login from "../pages/auth/login";
import secureLocalStorage from "react-secure-storage";
import ForgotPassword from "../pages/auth/forgot";
import Users from "../pages/dashboard/users";
import ProfileSetting from "../pages/dashboard/users/profileSetting"
import Subscription from "../pages/dashboard/subscription";
import SubscriptionEdit from "../pages/dashboard/subscription/edit";
// import Events from "../pages/dashboard/events";
import DashboardLayout from "../layout/dashboard";
import DashboardApp from "../pages/dashboard/dashboard";
import DataTable from "../pages/dashboard/datatable";
import Login from "../pages/auth/login";
import Contact from "../pages/dashboard/contacts";
export default function Router() {
  const isLoggedIn = secureLocalStorage.getItem("authenticated");
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardApp /> },
        // { path: "events", element: <Events /> },
        { path: "users", element: <Users /> },
        { path: "users/profile", element: <ProfileSetting /> },
        { path: "subscription", element: <Subscription /> },
        { path: "subscription/edit", element: <SubscriptionEdit /> },
        { path: "messages", element: <Contact /> },
        { path: "datatable", element: <DataTable /> },
        // { path: 'setting', element: <SettingPage/> },
        // { path: '*', element: <Page404/> },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? <AuthLayout /> : <Navigate to="/dashboard/app" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ]);

  return routes;
}