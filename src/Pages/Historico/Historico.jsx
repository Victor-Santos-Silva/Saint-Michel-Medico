import React, { useEffect, useState } from 'react';
import './Historico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Historico() {
  const [consultasPassadasUsuarios, setConsultasPassadasUsuarios] = useState([]);
  const [consultasPassadasDocentes, setConsultasPassadasDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

  // Inicializa AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 150,
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          const consultasPassadas = response.data.filter(consulta => {
            const dataHoraConsulta = new Date(`${consulta.data}T${consulta.hora}`);
            return dataHoraConsulta < new Date();
          });
          setConsultasPassadasUsuarios(consultasPassadas);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar consultas passadas de usuários:", error);
      });

    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data.agendamentoDocentes)) {
          const consultasPassadas = response.data.agendamentoDocentes.filter(consulta => {
            const dataHoraConsulta = new Date(`${consulta.data}T${consulta.hora}`);
            return dataHoraConsulta < new Date();
          });
          setConsultasPassadasDocentes(consultasPassadas);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar consultas passadas de docentes:", error);
      });
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <div className={`corpo-historico ${darkMode ? 'dark-mode' : ''}`}>
        <h1 
          className="titulo-principal"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Histórico de Consultas
        </h1>
        
        {/* Seção de Pacientes Comuns */}
        <div 
          className='secao-historico'
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="titulo-secao" data-aos="fade-up" data-aos-delay="400">
            Pacientes
          </h2>
          <div className='lista-historico'>
            {consultasPassadasUsuarios.length > 0 ? (
              consultasPassadasUsuarios.map((consulta, index) => (
                <div 
                  key={index} 
                  className={`item-historico ${darkMode ? 'dark-mode' : ''}`}
                  data-aos="fade-right"
                  data-aos-delay={300 + (index * 100)}
                >
                  <div className='info-paciente'>
                    <img 
                      src={consulta.usuario?.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Paciente" 
                      className={`foto-paciente ${darkMode ? 'dark-img' : ''}`}
                      data-aos="zoom-in"
                      data-aos-delay={400 + (index * 100)}
                    />
                    <div className='dados-paciente'>
                      <h3 data-aos="fade-up" data-aos-delay={500 + (index * 100)}>
                        {consulta.usuario?.nomeCompleto || 'Nome não disponível'}
                      </h3>
                      <p data-aos="fade-up" data-aos-delay={550 + (index * 100)}>
                        <strong>Data:</strong> {consulta.data || 'Data não informada'}
                      </p>
                      <p data-aos="fade-up" data-aos-delay={600 + (index * 100)}>
                        <strong>Hora:</strong> {consulta.hora || 'Hora não informada'}
                      </p>
                      <p data-aos="fade-up" data-aos-delay={650 + (index * 100)}>
                        <strong>Motivo:</strong> {consulta.motivo || 'Não informado'}
                      </p>
                    </div>
                  </div>
                  <div className='acoes-historico'>
                    {consulta.usuario?.id && (
                      <Link 
                        className="botao-prontuario" 
                        to={`/prontuario/${consulta.usuario.id}`}
                        state={{ consultaData: consulta.data, consultaHora: consulta.hora }}
                        data-aos="zoom-in"
                        data-aos-delay={700 + (index * 100)}
                      >
                        Ver Prontuário Completo
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sem-registros" data-aos="fade-up">
                Nenhuma consulta passada encontrada para pacientes.
              </p>
            )}
          </div>
        </div>

        {/* Seção de Docentes */}
        <div 
          className='secao-historico'
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="titulo-secao" data-aos="fade-up" data-aos-delay="400">
            Docentes
          </h2>
          <div className='lista-historico'>
            {consultasPassadasDocentes.length > 0 ? (
              consultasPassadasDocentes.map((consulta, index) => (
                <div 
                  key={index} 
                  className={`item-historico ${darkMode ? 'dark-mode' : ''}`}
                  data-aos="fade-left"
                  data-aos-delay={300 + (index * 100)}
                >
                  <div className='info-paciente'>
                    <img 
                      src={consulta.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Docente" 
                      className={`foto-paciente ${darkMode ? 'dark-img' : ''}`}
                      data-aos="zoom-in"
                      data-aos-delay={400 + (index * 100)}
                    />
                    <div className='dados-paciente'>
                      <h3 data-aos="fade-up" data-aos-delay={500 + (index * 100)}>
                        {consulta.nomeCompleto || 'Nome não disponível'}
                      </h3>
                      <p data-aos="fade-up" data-aos-delay={550 + (index * 100)}>
                        <strong>Data:</strong> {consulta.data || 'Data não informada'}
                      </p>
                      <p data-aos="fade-up" data-aos-delay={600 + (index * 100)}>
                        <strong>Hora:</strong> {consulta.hora || 'Hora não informada'}
                      </p>
                      <p data-aos="fade-up" data-aos-delay={650 + (index * 100)}>
                        <strong>Motivo:</strong> {consulta.motivo || 'Não informado'}
                      </p>
                    </div>
                  </div>
                  <div className='acoes-historico'>
                    {consulta.id && (
                      <Link 
                        className="botao-prontuario" 
                        to={`/prontuarioDocente/${consulta.id}`}
                        state={{ consultaData: consulta.data, consultaHora: consulta.hora }}
                        data-aos="zoom-in"
                        data-aos-delay={700 + (index * 100)}
                      >
                        Ver Prontuário Completo
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sem-registros" data-aos="fade-up">
                Nenhuma consulta passada encontrada para docentes.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}