import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/PaginaDeErro/ErroPage";
import HomeMedico from "../Pages/Home/HomeMedico";
import Login from "../Pages/Login/Login"
import Prontuario from "../Pages/Prontuario/Prontuario";



const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Login /> },
          { path: "/home", element: <HomeMedico /> },
          { path: "/prontuario", element: <Prontuario /> },
        ]
      }
]);

export default router;