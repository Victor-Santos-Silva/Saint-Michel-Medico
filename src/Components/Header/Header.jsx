import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {

  const { isLoggedIn, nomeCompleto, logout } = useAuth(); // Acessando o estado do usuário


  return (
    <header className="headerMedico">
      <div className="logoHeader">
        <img className="imgHeader" src="../src/Img/logoHeader.png" alt="Logo" />
      </div>

      <nav className="navbar">
        <div className="nav-medico">
          <Link to='/home' className='links'>Home</Link>
          <Link to='/historico' className='links'>Histórico</Link>
        </div>

        <div className="container-login-cadastro">
          {isLoggedIn ? (
            <div className="perfil-usuario">
              <p className="nome-usuario">Olá, {nomeCompleto}</p>
              <Link onClick={logout} className="btn-sair-perfil">Sair</Link>
            </div>
          ) : null}
        </div>
        
      </nav>
    </header>
  );
}
