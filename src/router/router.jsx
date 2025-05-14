import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../Components/PaginaDeErro/ErroPage";
import HomeMedico from "../Pages/Home/HomeMedico";
import Login from "../Pages/Login/Login";
import Prontuario from "../Pages/Prontuario/Prontuario";
import Historico from "../Pages/Historico/Historico";
import ProntuarioDocente from "../Pages/Prontuario/ProntuarioDocente/ProntuarioDocente";
import PerfilMedico from "../Pages/PerfilMédico/perfilMedico";
import Layout from "../Components/Layout/Layout"; // <-- aqui

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Layout />, // <-- todas as rotas abaixo usam o layout com Toast + Header/Footer
    children: [
      { path: "home", element: <HomeMedico /> },
      { path: "prontuario/:id", element: <Prontuario /> },
      { path: "prontuarioDocente/:id", element: <ProntuarioDocente /> },
      { path: "historico", element: <Historico /> },
      { path: "perfil", element: <PerfilMedico /> },
    ],
  }
]);

export default router;
