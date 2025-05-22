import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa';
import './Header.css';

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isLoggedIn, nomeCompleto, logout } = useAuth();

  return (
    <header className={`headerMedico ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Link to="/home" className="logoHeader">
        <img 
          className="imgHeader" 
          src="../img/logoHeader.png" 
          alt="Hospital Saint-Michel" 
        />
      </Link>

      <nav className="navbar">
        <div className="nav-medico">
          <Link to='/home' className='links'>Home</Link>
          <Link to='/historico' className='links'>Histórico</Link>
        </div>

        <div className="header-controls">
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Alternar tema"
          >
            {isDarkMode ? (
              <FaSun className="theme-icon" />
            ) : (
              <FaMoon className="theme-icon" />
            )}
            <span className="theme-text">
              {isDarkMode ? '' : ''}
            
            </span>
          </button>

          {isLoggedIn && (
            <div className="perfil-usuario">
              <Link to="/perfil" className="profile-link">
                <span className="nome-usuario">{nomeCompleto}</span>
              </Link>
              <button 
                onClick={logout} 
                className="btn-sair-perfil"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}