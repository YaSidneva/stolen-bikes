import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Main } from "./components/main/main";
import { ListOfEmloyees } from "./components/lists/ListOfEmployees";
import { ListOfThefts } from "./components/lists/ListOfThefts";
import { Root } from "./components/root/Root";
import { DetailsPageEmployee } from "./components/lists/detailsPage/DetailsPageEmployee";
import { DetailsPageThefts } from "./components/lists/detailsPage/DetailsPageTheft";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Main />,
        },
        {
          path: "employees",
          element: <ListOfEmloyees />,
        },
        {
          path: "thefts",
          element: <ListOfThefts />,
        },
        {
          path: "employees/:employeeId",
          element: <DetailsPageEmployee />,
        },
        {
          path: "cases/:theftId",
          element: <DetailsPageThefts />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
