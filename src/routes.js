import { createBrowserRouter } from "react-router-dom";

import GradientLayout from "./layouts/GradientLayout";
import GeneralLayout from "./layouts/GeneralLayout";

import UpcomingMovies from "./pages/UpcomingMovies";
import PopularMovies from "./pages/PopularMovies";
import SearchMovies from "./pages/SearchMovies";
import Action from "./pages/genres/Action";
import Comedy from "./pages/genres/Comedy";
import Drama from "./pages/genres/Drama";
import Family from "./pages/genres/Family";
import ScienceFiction from "./pages/genres/ScienceFiction";
import SavedMovies from "./pages/SavedMovies";

import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";

const routes = [
  {
    path: "/*",
    element: <GeneralLayout />,
    children: [
        {
            path: "",
            element: <Home/>
        },
        {
          path: "saved-movies",
          element: <SavedMovies />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },

        //Protected Routes
        {
        path: "user",
        element: <PrivateRoute />,
        children: [
            {
              path: "profile",
              element: <Dashboard />,
            },
            {
              path: "update-profile",
              element: <UpdateProfile />,
            },
        ],
        }
    ]
  },
  {
    path: "/movies/*",
    element: <GradientLayout />,
    children: [
      {
        path: "popular-movies",
        element: <PopularMovies />,
      },
      {
        path: "upcoming-movies",
        element: <UpcomingMovies />,
      },
      {
        path: "search-movies",
        element: <SearchMovies />,
      },
      {
        path: "action",
        element: <Action />,
      },
      {
        path: "comedy",
        element: <Comedy />,
      },
      {
        path: "science-fiction",
        element: <ScienceFiction />,
      },
      {
        path: "drama",
        element: <Drama />,
      },
      {
        path: "family",
        element: <Family />,
      }
    ],
  }
]

const router = createBrowserRouter(routes);

export { router };