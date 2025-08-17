import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Home from "./views/Home";
import AddEmployee from "./views/AddEmployee";
import EditEmployee from "./views/EditEmployee";
import NotFound from "./views/NotFound";

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "add-employee",
            element: <AddEmployee />,
          },
          {
            path: "employee/edit/:employeeId",
            element: <EditEmployee />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
    },
  );

  return <RouterProvider router={router} />;
};

export default Router;
