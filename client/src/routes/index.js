import { Navigate, useRoutes } from "react-router-dom";
// layouts
import LandingPage from "../pages/landingPage";
import AuthLayout from "../layout/authLayout";
import Login from "../pages/auth/login";
import ForgotPass from "../pages/auth/forgot";
import Register from "../pages/auth/register";
import LandingPageLayout from "../layout/landingPage/landingPageLayout";
import ProfileSetting from "../pages/profileSetting";
import ProfileListing from "../pages/profileListing";
// import Login from "../pages/auth/login";
// import secureLocalStorage from "react-secure-storage";
export default function Router() {
  // const isLoggedIn = secureLocalStorage.getItem(
  //   process.env.REACT_APP_AUTH_STORAGE_KEY
  // );
  const isLoggedIn = false;
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPageLayout />,

      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/profile-setting", element: <ProfileSetting /> },
        { path: "/profile-listings", element: <ProfileListing /> },
      ],
    },
    {
      path: "/auth",
      element: !isLoggedIn ? <AuthLayout /> : <Navigate to="/" />,
      children: [
        { path: "login", element: <Login /> },
        { path: "forgotPassword", element: <ForgotPass /> },
        { path: "register", element: <Register /> },

        // {
        //   path: "privacyPolicy",
        //   element: <PrivacyPolicy />,
        // },
        // {
        //   path: "termsAndCondition",
        //   element: <TermsAndCondition />,
        // },
        // { path: "downloadApk", element: <DownloadApk /> },
        // { path: "resetPassword", element: <ResetPassword /> },
        // { path: "/", element: <Navigate to="/login" /> },
      ],
    },
  ]);

  return routes;
}