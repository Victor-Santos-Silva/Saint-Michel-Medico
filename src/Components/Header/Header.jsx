// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export default function Header() {
  const { isLoggedIn, nomeCompleto, logout } = useAuth();

  return (
    <header className="headerMedico">
      <Link to="/home" className="logoHeader">
        <img 
          className="imgHeader" 
          src="../src/Img/logoHeader.png" 
          alt="Hospital Saint-Michel" 
        />
      </Link>

      <nav className="navbar">
        <div className="nav-medico">
          <Link to='/home' className='links'>Home</Link>
          <Link to='/historico' className='links'>Histórico</Link>
        </div>

        {isLoggedIn && (
          <div className="perfil-usuario">
            <span className="nome-usuario">{nomeCompleto}</span>
            <button 
              onClick={logout} 
              className="btn-sair-perfil"
            >
              Sair
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}