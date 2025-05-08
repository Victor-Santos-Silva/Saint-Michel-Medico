import React, { useEffect, useState, useRef } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;
  
  const consultasRef = useRef(null);
  const parentescoRef = useRef(null);

  // Inicializa AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 150,
    });
  }, []);

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
      <div className={`corpo ${darkMode ? 'dark-mode' : ''}`}>
        <div className={`imagensComeco ${darkMode ? 'dark-mode' : ''}`} 
             data-aos="fade-up"
             data-aos-delay="200">
          <img 
            className='LogoVerde' 
            src="../src/Img/LogoVerde.png" 
            alt="Hospital Saint-Michel" 
            data-aos="zoom-in"
            data-aos-delay="300"
          />
          <div data-aos="fade-up" data-aos-delay="400">
            <h2 className={`titulo ${darkMode ? 'dark-mode' : ''}`}>Consultas</h2>
          </div>
          <div className='lista-container' data-aos="fade-up" data-aos-delay="500">
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
                  <div 
                    key={index} 
                    className={`consultaItem ${darkMode ? 'dark-mode' : ''}`}
                    data-aos="fade-right"
                    data-aos-delay={300 + (index * 100)}
                  >
                    <img 
                      src={item.usuario?.imagemGenero || '/imagens/default.png'} 
                      alt="Paciente" 
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

        <div className={`imagensComeco ${darkMode ? 'dark-mode' : ''}`} 
             data-aos="fade-up"
             data-aos-delay="200">
          <h2 
            className={`titulo ${darkMode ? 'dark-mode' : ''}`}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Consultas de Parentesco
          </h2>
          <div className='lista-container' data-aos="fade-up" data-aos-delay="400">
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
                  <div 
                    key={index} 
                    className={`consultaItem ${darkMode ? 'dark-mode' : ''}`}
                    data-aos="fade-left"
                    data-aos-delay={300 + (index * 100)}
                  >
                    <img 
                      src={item.imagemGenero || '/imagens/default.png'} 
                      alt="Paciente" 
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