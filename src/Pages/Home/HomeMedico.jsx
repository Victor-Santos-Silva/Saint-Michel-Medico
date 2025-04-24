import React, { useEffect, useState, useRef } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const medicoLogadoId = id;
  
  const consultasRef = useRef(null);
  const parentescoRef = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setDataUsuarios(response.data);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar agendamentos de usuários:", error);
      });
  }, [medicoLogadoId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data.agendamentoDocentes)) {
          setDataDocentes(response.data.agendamentoDocentes);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar agendamentos de docentes:", error);
      });
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <br /><br /><br /><br />
      <div className={`corpo ${darkMode ? 'dark-mode' : ''}`}>
        <div className={`imagensComeco ${darkMode ? 'dark-mode' : ''}`}>
          <img 
            className={`LogoVerde ${darkMode ? 'dark-mode' : ''}`} 
            src="../src/Img/LogoVerde.png" 
            alt="Hospital Saint-Michel" 
          />
          <div>
            <h2 className={`titulo ${darkMode ? 'dark-mode' : ''}`}>Consultas</h2>
          </div>
          <div className={`lista-container ${darkMode ? 'dark-mode' : ''}`}>
            <button 
              className={`nav-button left ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => scrollLeft(consultasRef)}
              disabled={dataUsuarios.length <= 3}
            >
              &lt;
            </button>
            <div className={`listaConsultas ${darkMode ? 'dark-mode' : ''}`} ref={consultasRef}>
              {dataUsuarios.length > 0 ? (
                dataUsuarios.map((item, index) => (
                  <div key={index} className={`consultaItem ${darkMode ? 'dark-mode' : ''}`}>
                    <img 
                      src={item.usuario?.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Paciente" 
                      className={darkMode ? 'dark-img' : ''}
                    />
                    <p>{item.usuario?.nomeCompleto || 'Nome não disponível'}</p>
                    <p>Data: {item.data || 'Data não informada'}</p>
                    <p>Hora: {item.hora || 'Hora não informada'}</p>
                    {item.usuario?.id && (
                      <Link 
                        className={`button-prontuario ${darkMode ? 'dark-mode' : ''}`} 
                        to={`/prontuario/${item.usuario.id}`}
                      >
                        Prontuário
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <p className={`semPacientes ${darkMode ? 'dark-mode' : ''}`}>Nenhum paciente encontrado.</p>
              )}
            </div>
            <button 
              className={`nav-button right ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => scrollRight(consultasRef)}
              disabled={dataUsuarios.length <= 3}
            >
              &gt;
            </button>
          </div>
        </div>
        <br />

        <div className={`imagensComeco ${darkMode ? 'dark-mode' : ''}`}>
          <h2 className={`titulo ${darkMode ? 'dark-mode' : ''}`}>Consultas de Parentesco</h2>
          <div className={`lista-container ${darkMode ? 'dark-mode' : ''}`}>
            <button 
              className={`nav-button left ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => scrollLeft(parentescoRef)}
              disabled={dataDocentes.length <= 3}
            >
              &lt;
            </button>
            <div className={`listaConsultas ${darkMode ? 'dark-mode' : ''}`} ref={parentescoRef}>
              {dataDocentes.length > 0 ? (
                dataDocentes.map((item, index) => (
                  <div key={index} className={`consultaItem ${darkMode ? 'dark-mode' : ''}`}>
                    <img 
                      src={item.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Paciente" 
                      className={darkMode ? 'dark-img' : ''}
                    />
                    <p>{item.nomeCompleto || 'Nome não disponível'}</p>
                    <p>Data: {item.data || 'Data não informada'}</p>
                    <p>Hora: {item.hora || 'Hora não informada'}</p>
                    {item.id && (
                      <Link 
                        className={`button-prontuario ${darkMode ? 'dark-mode' : ''}`} 
                        to={`/prontuarioDocente/${item.id}`}
                      >
                        Prontuário
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <p className={`semPacientes ${darkMode ? 'dark-mode' : ''}`}>Nenhum Parentesco encontrado.</p>
              )}
            </div>
            <button 
              className={`nav-button right ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => scrollRight(parentescoRef)}
              disabled={dataDocentes.length <= 3}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}