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
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUser
} from 'react-icons/fi';
import { FaStethoscope, FaUserMd } from 'react-icons/fa';
import LogoVerde from '../../Img/LogoVerde.png';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 120, easing: 'ease-in-out-quart' });
  }, []);

  useEffect(() => {
    const hoje = new Date();

    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const agendamentosFiltrados = response.data.filter(a => {
            const dataAgendamento = new Date(a.data);
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

    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (Array.isArray(response.data.agendamentoDocentes)) {
          const agendamentosFiltrados = response.data.agendamentoDocentes.filter(a => {
            const dataAgendamento = new Date(a.data);
            return (
              a.status !== 'finalizado' &&
              a.status !== 'nao_compareceu' &&
              dataAgendamento >= hoje
            );
          });
          setDataDocentes(agendamentosFiltrados);
        }
      })
      .catch(error => console.error("Erro ao buscar docentes:", error));
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <div className={`corpo ${darkMode ? 'dark-mode' : ''}`}>
        <div className="logo-center-container" data-aos="fade-down">
          <img
            src={LogoVerde}
            alt="Hospital Saint-Michel"
            className={`hospital-logo ${darkMode ? 'dark-mode' : ''}`}
            data-aos="zoom-in"
          />
        </div>

        {/* Consultas Agendadas */}
        <section>
          <h2>
            <FiCalendar /> Consultas Agendadas
          </h2>

          {dataUsuarios.length > 0 ? (
            <div>
              {dataUsuarios.map((item, index) => (
                <div key={index}>
                  <h3>{item.usuario?.nomeCompleto || 'Nome não disponível'}</h3>
                  <p>Data: {item.data || 'Data não informada'}</p>
                  <p>Hora: {item.hora || 'Hora não informada'}</p>
                  {item.usuario?.id && (
                    <Link to={`/prontuario/${item.id}`}>Ver Prontuário</Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma consulta agendada para hoje</p>
          )}
        </section>

        {/* Consultas de Parentesco */}
        <section>
          <h2>
            <FaStethoscope /> Consultas de Parentesco
          </h2>

          {dataDocentes.length > 0 ? (
            <div>
              {dataDocentes.map((item, index) => (
                <div key={index}>
                  <h3>{item.nomeCompleto || 'Nome não disponível'}</h3>
                  <p>Data: {item.data || 'Data não informada'}</p>
                  <p>Hora: {item.hora || 'Hora não informada'}</p>
                  {item.id && (
                    <Link to={`/prontuarioDocente/${item.id}`}>Ver Prontuário</Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum parentesco agendado para hoje</p>
          )}
        </section>

      </div>
      <Footer />
    </>
  );
}
