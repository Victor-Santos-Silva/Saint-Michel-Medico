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
import { FiChevronLeft, FiChevronRight, FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import { FaStethoscope, FaUserMd } from 'react-icons/fa';
import LogoVerde from '../../Img/LogoVerde.png'; // Importação direta da imagem

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

  const consultasRef = useRef(null);
  const parentescoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-in-out-quart'
    });
  }, []);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const agendamentosFiltrados = response.data.filter(agendamento =>
            agendamento.status !== 'finalizado' && agendamento.status !== 'nao_compareceu'
          );
          setDataUsuarios(agendamentosFiltrados);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar agendamentos de usuários:", error);
      });
  }, [medicoLogadoId]);

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        console.log("Dados brutos da API:", response.data);

        if (response.data && Array.isArray(response.data.agendamentoDocentes)) {
          const agendamentosFiltrados = response.data.agendamentoDocentes.filter(agendamento =>
            agendamento.status !== 'finalizado' && agendamento.status !== 'nao_compareceu'
          );

          console.log("Agendamentos filtrados:", agendamentosFiltrados);
          setDataDocentes(agendamentosFiltrados);
        } else {
          console.log("Resposta inesperada:", response.data);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados dos docentes:", error);
      });
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <div className={`corpo ${darkMode ? 'dark-mode' : ''}`}>
        {/* <<<<<<< HEAD
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
              {dataUsuarios.filter(a => a.status !== 'nao_compareceu' && a.status !== 'finalizado').length > 0 ? (
                dataUsuarios
                  .filter(a => a.status !== 'nao_compareceu' && a.status !== 'finalizado')
                  .map((item, index) => (
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
                          to={`/prontuario/${item.id}`}
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
                      alt="Docente"
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
======= */}
        <div className="container-medico">
          {/* Logo Centralizado */}
          <div className="logo-center-container" data-aos="fade-down">
            <img
              src={LogoVerde}
              alt="Hospital Saint-Michel"
              className={`hospital-logo ${darkMode ? 'dark-mode' : ''}`}
              data-aos="zoom-in"
            />
          </div>

          {/* Seção de Boas-Vindas */}
          <div className="welcome-section" data-aos="fade-up">
            <div className="welcome-content">
              <h1 className={`welcome-title ${darkMode ? 'dark-mode' : ''}`}>
                <FaUserMd className="welcome-icon" /> Bem-vindo, Doutor(a)
              </h1>
              <p className={`welcome-subtitle ${darkMode ? 'dark-mode' : ''}`}>
                Aqui você pode gerenciar todas as consultas agendadas para hoje
              </p>
            </div>
            <div className={`stats-container ${darkMode ? 'dark-mode' : ''}`}>
              <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
                <div className="stat-icon patients">
                  <FiUser />
                </div>
                <div className="stat-info">
                  <h3>{dataUsuarios.length}</h3>
                  <p>Pacientes</p>
                </div>
              </div>
              <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
                <div className="stat-icon relatives">
                  <FaStethoscope />
                </div>
                <div className="stat-info">
                  <h3>{dataDocentes.length}</h3>
                  <p>Parentescos</p>
                </div>
              </div>
            </div>
{/* ---------------------------------------------------------- */}
          </div>

          {/* Seção de Consultas */}
          <section className="consultas-section">
            <div className="section-header" data-aos="fade-up">
              <h2 className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
                <FiCalendar className="section-icon" /> Consultas Agendadas
              </h2>
              <div className="section-line"></div>
            </div>

            <div className="carousel-container" data-aos="fade-up" data-aos-delay="100">
              <button
                className={`nav-button left ${darkMode ? 'dark-mode' : ''} ${dataUsuarios.length <= 3 ? 'disabled' : ''}`}
                onClick={() => scrollLeft(consultasRef)}
                disabled={dataUsuarios.length <= 3}
              >
                <FiChevronLeft />
              </button>

              <div className={`carousel ${darkMode ? 'dark-mode' : ''}`} ref={consultasRef}>
                {dataUsuarios.length > 0 ? (
                  dataUsuarios.map((item, index) => (
                    <div
                      key={index}
                      className={`consulta-card ${darkMode ? 'dark-mode' : ''}`}
                      data-aos="fade-right"
                      data-aos-delay={150 + (index * 50)}
                    >
                      <div className="card-header">
                        <img
                          src={item.usuario?.imagemGenero || '/imagens/default-user.png'}
                          alt="Paciente"
                          className="patient-avatar"
                        />
                        <h3 className="patient-name">{item.usuario?.nomeCompleto || 'Nome não disponível'}</h3>
                      </div>
                      <div className="card-details">
                        <div className="detail-item">
                          <FiCalendar className="detail-icon" />
                          <span>{item.data || 'Data não informada'}</span>
                        </div>
                        <div className="detail-item">
                          <FiClock className="detail-icon" />
                          <span>{item.hora || 'Hora não informada'}</span>
                        </div>
                      </div>
                      {item.usuario?.id && (
                        <Link
                          className={`prontuario-button ${darkMode ? 'dark-mode' : ''}`}
                          to={`/prontuario/${item.usuario.id}`}
                        >
                          Ver Prontuário
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state" data-aos="fade-up">
                    <img src={darkMode ? "/imagens/no-data-dark.png" : "/imagens/no-data-light.png"} alt="Sem pacientes" />
                    <p>Nenhuma consulta agendada para hoje</p>
                  </div>
                )}
              </div>

              <button
                className={`nav-button right ${darkMode ? 'dark-mode' : ''} ${dataUsuarios.length <= 3 ? 'disabled' : ''}`}
                onClick={() => scrollRight(consultasRef)}
                disabled={dataUsuarios.length <= 3}
              >
                <FiChevronRight />
              </button>
            </div>
          </section>

          {/* Seção de Parentescos */}
          <section className="consultas-section">
            <div className="section-header" data-aos="fade-up">
              <h2 className={`section-title ${darkMode ? 'dark-mode' : ''}`}>
                <FaStethoscope className="section-icon" /> Consultas de Parentesco
              </h2>
              <div className="section-line"></div>
            </div>

            <div className="carousel-container" data-aos="fade-up" data-aos-delay="100">
              <button
                className={`nav-button left ${darkMode ? 'dark-mode' : ''} ${dataDocentes.length <= 3 ? 'disabled' : ''}`}
                onClick={() => scrollLeft(parentescoRef)}
                disabled={dataDocentes.length <= 3}
              >
                <FiChevronLeft />
              </button>

              <div className={`carousel ${darkMode ? 'dark-mode' : ''}`} ref={parentescoRef}>
                {dataDocentes.length > 0 ? (
                  dataDocentes.map((item, index) => (
                    <div
                      key={index}
                      className={`consulta-card ${darkMode ? 'dark-mode' : ''}`}
                      data-aos="fade-left"
                      data-aos-delay={150 + (index * 50)}
                    >
                      <div className="card-header">
                        <img
                          src={item.imagemGenero || '/imagens/default-user.png'}
                          alt="Parentesco"
                          className="patient-avatar"
                        />
                        <h3 className="patient-name">{item.nomeCompleto || 'Nome não disponível'}</h3>
                      </div>
                      <div className="card-details">
                        <div className="detail-item">
                          <FiCalendar className="detail-icon" />
                          <span>{item.data || 'Data não informada'}</span>
                        </div>
                        <div className="detail-item">
                          <FiClock className="detail-icon" />
                          <span>{item.hora || 'Hora não informada'}</span>
                        </div>
                      </div>
                      {item.id && (
                        <Link
                          className={`prontuario-button ${darkMode ? 'dark-mode' : ''}`}
                          to={`/prontuarioDocente/${item.id}`}
                        >
                          Ver Prontuário
                        </Link>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-state" data-aos="fade-up">
                    <img src={darkMode ? "/imagens/no-data-dark.png" : "/imagens/no-data-light.png"} alt="Sem parentescos" />
                    <p>Nenhum parentesco agendado para hoje</p>
                  </div>
                )}
              </div>

              <button
                className={`nav-button right ${darkMode ? 'dark-mode' : ''} ${dataDocentes.length <= 3 ? 'disabled' : ''}`}
                onClick={() => scrollRight(parentescoRef)}
                disabled={dataDocentes.length <= 3}
              >
                <FiChevronRight />
              </button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}