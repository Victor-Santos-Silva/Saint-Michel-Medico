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
  const [dataDependentes, setDataDependentes] = useState([]);
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

  const parseLocalDate = (dateString) => {
    return new Date(dateString + 'T12:00:00');
  };

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const isSameLocalDate = (d1, d2) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/agendamento/listar?medico_id=${medicoLogadoId}`);

        console.log('Response Usuario:', response.data);
        if (Array.isArray(response.data)) {
          const agendamentosFiltrados = response.data.filter(a => {
            return (
              a.status !== 'finalizado' &&
              a.status !== 'nao_compareceu'
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

  // Fetch dependentes agendamentos
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const isSameLocalDate = (d1, d2) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/agendarDependente/agendamentoGeralDependente?medico_id=${medicoLogadoId}`);

        if (Array.isArray(response.data.agendamentoDependente)) {
          const agendamentosFiltrados = response.data.agendamentoDependente.filter(a => {
            return (
              a.status !== 'finalizado' &&
              a.status !== 'nao_compareceu'
            );
          });
          setDataDependentes(agendamentosFiltrados);
        }
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
                    <p><FiCalendar /> Data: {usuario.data.split('-').reverse().join('/')}</p>
                    <p><FiClock /> Horário: {new Date(usuario.hora).toISOString().slice(11, 16)}</p>


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

        {/* Dependentes - AGENDAMENTOS DE HOJE */}
        {dataDependentes.length > 0 ? (
          <div className="agendamentos-container">
            <h2 className='titleHome'>Agendamentos</h2>
            <div className="navigation-buttons">
              <button className="nav-btn" onClick={scrollLeft} aria-label="Voltar">&lt;</button>
              <button className="nav-btn" onClick={scrollRight} aria-label="Avançar">&gt;</button>
            </div>
            <div className="carrossel-agendamentos" ref={carrosselRef}>
              {dataDependentes.map((dep) => (
                <div key={dep.id} className="agendamento-card">
                  <div className="card-header">
                    <img
                      src={dep.Dependente?.imagemGenero || (darkMode ? '/img/pacienteM.png' : '/img/pacienteM.png')}
                      alt="Imagem do Dependente"
                      className={darkMode ? 'dark-img' : ''}
                    />
                    <h3>{dep.Dependente?.nomeCompleto}</h3>
                  </div>
                  <div className="card-body">
                    <p><FiCalendar /> Data: {dep.data.split('-').reverse().join('/')}</p>
                     <p><FiClock /> Horário: {new Date(dep.hora).toISOString().slice(11, 16)}</p>
                    <p><RiFileList2Fill /> Status: {dep.status}</p>
                  </div>
                  <Link to={`/prontuarioDependente/${dep?.id}`} className="botao-prontuario">
                    Prontuário
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