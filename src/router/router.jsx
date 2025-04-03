import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../Components/PaginaDeErro/ErroPage";
import HomeMedico from "../Pages/Home/HomeMedico";
import Login from "../Pages/Login/Login";
import Prontuario from "../Pages/Prontuario/Prontuario";
import Historico from "../Pages/Historico/Historico";
import ProntuarioDocente from "../Pages/Prontuario/ProntuarioDocente/ProntuarioDocente";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/home", element: <HomeMedico /> },
  { path: "/prontuario/:id", element: <Prontuario /> },
  { path: "/prontuarioDocente/:id", element: <ProntuarioDocente /> },
  { path: "/historico", element: <Historico /> }
]);

export default router;
