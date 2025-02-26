import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/PaginaDeErro/ErroPage";
import HomeMedico from "../Pages/Home/HomeMedico";
import Login from "../Pages/Login/Login"



const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <HomeMedico /> },
          { path: "/login", element: <Login /> },
        ]
      }
]);

export default router;