import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ isLoggedIn, username, logout }) {
  return (
    <header className="headerMedico">
      <div className="logoHeader">
        <img className="imgHeader" src="../src/Img/logoHeader.png" alt="Logo" />
      </div>

      <nav className="navbar">
        <div className="nav-medico">
          <Link to='/' className='links'>HOME</Link>
          <Link to= '/agenda' className='links'>AGENDA</Link>
        </div>

      </nav>
      
      <div className="container-login-cadastro">
          {isLoggedIn ? (
            <div className="perfil-usuario">
              <img className='userImg' src="../src/Img/userMasculino.png" />
              <p className="nome-usuario">Olá, Dr. {username}</p>
              <button onClick={logout} className="btn-sair-perfil">Sair</button>
            </div>
          ) : (
            <div className="nav-actions">
              <Link to='/login' className="login-button">Login</Link>
            </div>
          )}
        </div>
    </header>
  );
}
