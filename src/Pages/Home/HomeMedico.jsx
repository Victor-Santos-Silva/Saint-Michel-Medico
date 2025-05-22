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
import { FiCalendar, FiClock } from 'react-icons/fi';
import { RiFileList2Fill } from 'react-icons/ri';
import LogoVerde from '../../Img/LogoVerde.png';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { isDarkMode: darkMode } = useTheme();
  const medicoLogadoId = id;
  const carrosselRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-in-out-quart'
    });
  }, []);

  const scrollLeft = () => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carrosselRef.current) {
      carrosselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const response = await axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`);

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
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, [medicoLogadoId]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const response = await axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`);
        console.log(response.data.agendamentoDocentes);
        
        const agendamentos = Array.isArray(response.data)
          ? response.data
          : (Array.isArray(response.data.agendamentoDocentes)
            ? response.data.agendamentoDocentes
            : []);

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
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, [medicoLogadoId]);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Header />
        <img src={LogoVerde} alt="Logo Verde" className='imgHome' />

      <main className="main-content">

        {/* paciente */}
        {dataUsuarios.length > 0 ? (
          <div className="agendamentos-container">
            <h2 className='titleHome'>Agendamentos</h2>
            <div className="navigation-buttons">
              <button className="nav-btn" onClick={scrollLeft} aria-label="Voltar">&lt;</button>
              <button className="nav-btn" onClick={scrollRight} aria-label="Avançar">&gt;</button>
            </div>
            <div className="carrossel-agendamentos" ref={carrosselRef}>
              {dataUsuarios.map((usuario) => (
                <div key={usuario.id} className="agendamento-card">
                  <div className="card-header">
                    <img
                      src={usuario.usuario.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
                      alt="Imagem do Paciente"
                      className={darkMode ? 'dark-img' : ''}
                    />
                    <h3>{usuario.usuario.nomeCompleto}</h3>
                  </div>
                  <div className="card-body">
                    <p><FiCalendar /> Data: {new Date(usuario.data).toLocaleDateString('pt-BR')}</p>
                    <p><FiClock /> Horário: {usuario.hora}</p>
                    <p><RiFileList2Fill /> Status: {usuario.status}</p>
                  </div>
                  <Link to={`/prontuario/${usuario.id}`} className="botao-prontuario">
                    Prontuario
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-agendamentos">
            <h2>Nenhum agendamento encontrado</h2>
          </div>
        )}

        {/* dependente */}
        {dataDocentes.length > 0 ? (
          <div className="agendamentos-container">
            <h2 className='titleHome'>Agendamentos de Dependentes</h2>
            <div className="navigation-buttons">
              <button className="nav-btn" onClick={scrollLeft} aria-label="Voltar">&lt;</button>
              <button className="nav-btn" onClick={scrollRight} aria-label="Avançar">&gt;</button>
            </div>
            <div className="carrossel-agendamentos" ref={carrosselRef}>
              {dataDocentes.map((dependente) => (
                <div key={dependente.id} className="agendamento-card">
                  <div className="card-header">
                    <img
                      src={dependente.usuario.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
                      alt="Imagem do Paciente"
                      className={darkMode ? 'dark-img' : ''}
                    />
                    <h3>{dependente.nomeCompleto}</h3>
                  </div>
                  <div className="card-body">
                    <p><FiCalendar /> Data: {new Date(dependente.data).toLocaleDateString('pt-BR')}</p>
                    <p><FiClock /> Horário: {dependente.hora}</p>
                    <p><RiFileList2Fill /> Status: {dependente.status}</p>
                  </div>
                  <Link to={`/prontuarioDocente/${dependente.id}`} className="botao-prontuario">
                    Prontuario
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-agendamentos">
            <h2>Nenhum agendamento encontrado</h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}