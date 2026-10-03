import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../components/Login";
import Signup from "../components/Signup";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import CreateJob from "../Pages/CreateJob";
import UpdateJob from "../Pages/UpdateJob";
import JobDetails from "../Pages/JobDetails";
import Resume from "../Pages/Resume";
import MyApplications from "../Pages/MyApplications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <CreateJob /> },
      { path: "/my-job", element: <MyJobs /> },
      { path: "/my-applications", element: <MyApplications /> },
      { path: "/resume", element: <Resume /> },
      { path: "/salary", element: <SalaryPage /> },
      {
        path: "edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
      { path: "/job/:id", element: <JobDetails /> }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> }
]);

export default router;
