import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErroPage from './Components/PaginaDeErro/ErroPage.jsx';
import { AuthProvider } from './AuthContext.jsx';
import Login from './Pages/Login/Login.jsx';
import HomeMedico from './Pages/Home/HomeMedico.jsx';


const router = createBrowserRouter([
  {
    /* path: "/", // A rota principal não terá um "element" */
    errorElement: <ErroPage />, // Página de erro caso algo dê errado
    children: [
      
      {
        path: "/" , 
        element: <Login />,
      },
      {
        path: "/agenda" , 
        element: <Login />,
      },
      {
        path: "/login" , 
        element: <Login />,
      },
      {
        path: "/home" , 
        element: <HomeMedico />,
      }
    
     
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
