import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Main } from "./components/main/main";
import { Layout } from "./components/layout/layout";
import { Footer } from "./components/footer/footer";
import { ListOfEmloyees } from "./components/lists/ListOfEmployees";
import { Header } from "./components/header/header";
import { ListOfThefts } from "./components/lists/ListOfThefts";
import { Root } from "./components/root/Root";
import { DetailsPageEmployee } from "./components/lists/detailsPage/DetailsPageEmployee";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Root/>
    ),
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/employees",
        element: <ListOfEmloyees />,
      },
      {
        path: "/thefts",
        element: <ListOfThefts />,
      },
      {
        path: '/employees/:employeeId',
        element: <DetailsPageEmployee />
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
