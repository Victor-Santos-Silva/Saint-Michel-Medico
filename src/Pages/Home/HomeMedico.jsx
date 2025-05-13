import React, { useEffect, useState } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { FaStethoscope, FaUserMd, FaNotesMedical } from 'react-icons/fa';
import LogoVerde from '../../Img/LogoVerde.png';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      offset: 120, 
      easing: 'ease-in-out-quart' 
    });
  }, []);

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Resetar horas para comparar apenas a data

    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const agendamentosFiltrados = response.data.filter(a => {
            if (!a.data) return false;
            
            const dataAgendamento = new Date(a.data);
            dataAgendamento.setHours(0, 0, 0, 0);
            
            return (
              a.status !== 'finalizado' &&
              a.status !== 'nao_compareceu' &&
              dataAgendamento >= hoje
            );
          });
          setDataUsuarios(agendamentosFiltrados);
        }
      })
      .catch(error => console.error("Erro ao buscar agendamentos:", error));
  }, [medicoLogadoId]);

  useEffect(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Resetar horas para comparar apenas a data

    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        // Verifica se a resposta tem a estrutura esperada
        const agendamentos = Array.isArray(response.data) ? 
          response.data : 
          (Array.isArray(response.data.agendamentoDocentes) ? 
            response.data.agendamentoDocentes : 
            []);

        const agendamentosFiltrados = agendamentos.filter(a => {
          if (!a.data) return false;
          
          const dataAgendamento = new Date(a.data);
          dataAgendamento.setHours(0, 0, 0, 0);
          
          return (
            a.status !== 'finalizado' &&
            a.status !== 'nao_compareceu' &&
            dataAgendamento >= hoje
          );
        });
        
        setDataDocentes(agendamentosFiltrados);
      })
      .catch(error => {
        console.error("Erro ao buscar docentes:", error);
        setDataDocentes([]); // Garante que o estado seja definido como array vazio em caso de erro
      });
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <div className={`corpo ${darkMode ? 'dark-mode' : ''}`}>
        <div className="container-medico">
          {/* Logo e Cabeçalho */}
          <div className="header-section" data-aos="fade-down">
            <div className="logo-container">
              <img
                src={LogoVerde}
                alt="Hospital Saint-Michel"
                className={`hospital-logo ${darkMode ? 'dark-mode' : ''}`}
                data-aos="zoom-in"
              />
            </div>
            <div className="welcome-section">
              <h1 className={`welcome-title ${darkMode ? 'dark-mode' : ''}`}>
                <FaUserMd className="welcome-icon" /> Bem-vindo, Doutor(a)
              </h1>
              <p className={`welcome-subtitle ${darkMode ? 'dark-mode' : ''}`}>
                Aqui estão suas consultas agendadas
              </p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="stats-container" data-aos="fade-up">
            <div className={`stat-card ${darkMode ? 'dark-mode' : ''}`}>
              <div className="stat-icon patients">
                <FiUser />
              </div>
              <div className="stat-info">
                <h3>{dataUsuarios.length}</h3>
                <p>Pacientes Hoje</p>
              </div>
            </div>
            <div className={`stat-card ${darkMode ? 'dark-mode' : ''}`}>
              <div className="stat-icon relatives">
                <FaStethoscope />
              </div>
              <div className="stat-info">
                <h3>{dataDocentes.length}</h3>
                <p>Parentescos Hoje</p>
              </div>
            </div>
          </div>

          {/* Consultas Agendadas */}
          <section className="consultas-section" data-aos="fade-up">
            <div className="section-header">
              <h2 className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
                <FiCalendar className="section-icon" /> Consultas Agendadas
              </h2>
              <div className="section-line"></div>
            </div>

            {dataUsuarios.length > 0 ? (
              <div className="consultas-grid">
                {dataUsuarios.map((item, index) => (
                  <div 
                    key={index} 
                    className={`consulta-card ${darkMode ? 'dark-mode' : ''}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="card-header">
                      <div className="patient-avatar">
                        {item.usuario?.imagemGenero ? (
                          <img src={item.usuario.imagemGenero} alt="Paciente" />
                        ) : (
                          <FiUser className="avatar-icon" />
                        )}
                      </div>
                      <h3 className="patient-name">{item.usuario?.nomeCompleto || 'Nome não disponível'}</h3>
                    </div>
                    <div className="card-details">
                      <div className="detail-item">
                        <FiCalendar className="detail-icon" />
                        <span>{item.data ? new Date(item.data).toLocaleDateString() : 'Data não informada'}</span>
                      </div>
                      <div className="detail-item">
                        <FiClock className="detail-icon" />
                        <span>{item.hora || 'Hora não informada'}</span>
                      </div>
                      {item.usuario?.telefone && (
                        <div className="detail-item">
                          <FiPhone className="detail-icon" />
                          <span>{item.usuario.telefone}</span>
                        </div>
                      )}
                    </div>
                    {item.usuario?.id && (
                      <Link 
                        className={`prontuario-button ${darkMode ? 'dark-mode' : ''}`} 
                        to={`/prontuario/${item.usuario.id}`}
                      >
                        <FaNotesMedical /> Ver Prontuário
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" data-aos="fade-up">
                <p className={`empty-text ${darkMode ? 'dark-mode' : ''}`}>
                  Nenhuma consulta agendada para hoje
                </p>
              </div>
            )}
          </section>

          {/* Consultas de Parentesco */}
          <section className="consultas-section" data-aos="fade-up">
            <div className="section-header">
              <h2 className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
                <FaStethoscope className="section-icon" /> Consultas de Parentesco
              </h2>
              <div className="section-line"></div>
            </div>

            {dataDocentes.length > 0 ? (
              <div className="consultas-grid">
                {dataDocentes.map((item, index) => (
                  <div 
                    key={index} 
                    className={`consulta-card ${darkMode ? 'dark-mode' : ''}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <div className="card-header">
                      <div className="patient-avatar">
                        {item.imagemGenero ? (
                          <img src={item.imagemGenero} alt="Parentesco" />
                        ) : (
                          <FiUser className="avatar-icon" />
                        )}
                      </div>
                      <h3 className="patient-name">{item.nomeCompleto || 'Nome não disponível'}</h3>
                    </div>
                    <div className="card-details">
                      <div className="detail-item">
                        <FiCalendar className="detail-icon" />
                        <span>{item.data ? new Date(item.data).toLocaleDateString() : 'Data não informada'}</span>
                      </div>
                      <div className="detail-item">
                        <FiClock className="detail-icon" />
                        <span>{item.hora || 'Hora não informada'}</span>
                      </div>
                      {item.telefone && (
                        <div className="detail-item">
                          <FiPhone className="detail-icon" />
                          <span>{item.telefone}</span>
                        </div>
                      )}
                    </div>
                    {item.id && (
                      <Link 
                        className={`prontuario-button ${darkMode ? 'dark-mode' : ''}`} 
                        to={`/prontuarioDocente/${item.id}`}
                      >
                        <FaNotesMedical /> Ver Prontuário
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state" data-aos="fade-up">
                <p className={`empty-text ${darkMode ? 'dark-mode' : ''}`}>
                  Nenhum parentesco agendado para hoje
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}