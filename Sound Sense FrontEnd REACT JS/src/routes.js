import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AboutUS from "./pages/About Us/AboutUs";
import App from "./App";
import Manager from "./pages/manage-form/ManageForm";
import Addform from "./pages/manage-form/AddForm";
import Updateform from "./pages/manage-form/UpdateForm";
import UpdateUser from "./pages/manage-users/UpdateUser";
import ManageUser from "./pages/manage-users/ManageUser";
import Profile from "./pages/Profile/Person";
import UpdateProfile from "./pages/Profile/UpdateProfile";
import Exam from "./pages/Exam/quiz";
import Score from "./pages/Exam/Score";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import User from "./middleware/User";
//import Quiz from "./pages/Exam/quiz";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUS />,
      },
      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/manage-form",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Manager />,
          },
          {
            path: "add",
            element: <Addform />,
          },
          {
            path: ":id",
            element: <Updateform />,
          },
        ],
      },
      {
        path: "/manage-user",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageUser />,
          },

          {
            path: ":id",
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: "/exam",
        element: <User />,
        children: [
          {
            path: "",
            element: <Exam />,
          },
          {
            path: "Score",
            element: <Score />,
          },
        ],
      },
      {
        path: "/profile",
        element: <User />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: ":id",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
