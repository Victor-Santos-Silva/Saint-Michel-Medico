import React, { useEffect, useState } from 'react';
import './Historico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

export default function Historico() {
  const [consultasPassadasUsuarios, setConsultasPassadasUsuarios] = useState([]);
  const [consultasPassadasDocentes, setConsultasPassadasDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

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
      <br /><br /><br /><br />
      <div className={`corpo-historico ${darkMode ? 'dark-mode' : ''}`}>
        <h1 className="titulo-principal">
          Histórico de Consultas
        </h1>
        
        {/* Seção de Pacientes Comuns */}
        <div className='secao-historico'>
          <h2 className="titulo-secao">Pacientes</h2>
          <div className='lista-historico'>
            {consultasPassadasUsuarios.length > 0 ? (
              consultasPassadasUsuarios.map((consulta, index) => (
                <div 
                  key={index} 
                  className={`item-historico ${darkMode ? 'dark-mode' : ''}`}
                >
                  <div className='info-paciente'>
                    <img 
                      src={consulta.usuario?.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Paciente" 
                      className={`foto-paciente ${darkMode ? 'dark-img' : ''}`}
                    />
                    <div className='dados-paciente'>
                      <h3>{consulta.usuario?.nomeCompleto || 'Nome não disponível'}</h3>
                      <p><strong>Data:</strong> {consulta.data || 'Data não informada'}</p>
                      <p><strong>Hora:</strong> {consulta.hora || 'Hora não informada'}</p>
                      <p><strong>Motivo:</strong> {consulta.motivo || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className='acoes-historico'>
                    {consulta.usuario?.id && (
                      <Link 
                        className="botao-prontuario" 
                        to={`/prontuario/${consulta.usuario.id}`}
                        state={{ consultaData: consulta.data, consultaHora: consulta.hora }}
                      >
                        Ver Prontuário Completo
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sem-registros">
                Nenhuma consulta passada encontrada para pacientes.
              </p>
            )}
          </div>
        </div>

        {/* Seção de Docentes */}
        <div className='secao-historico'>
          <h2 className="titulo-secao">Docentes</h2>
          <div className='lista-historico'>
            {consultasPassadasDocentes.length > 0 ? (
              consultasPassadasDocentes.map((consulta, index) => (
                <div 
                  key={index} 
                  className={`item-historico ${darkMode ? 'dark-mode' : ''}`}
                >
                  <div className='info-paciente'>
                    <img 
                      src={consulta.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')} 
                      alt="Docente" 
                      className={`foto-paciente ${darkMode ? 'dark-img' : ''}`}
                    />
                    <div className='dados-paciente'>
                      <h3>{consulta.nomeCompleto || 'Nome não disponível'}</h3>
                      <p><strong>Data:</strong> {consulta.data || 'Data não informada'}</p>
                      <p><strong>Hora:</strong> {consulta.hora || 'Hora não informada'}</p>
                      <p><strong>Motivo:</strong> {consulta.motivo || 'Não informado'}</p>
                    </div>
                  </div>
                  <div className='acoes-historico'>
                    {consulta.id && (
                      <Link 
                        className="botao-prontuario" 
                        to={`/prontuarioDocente/${consulta.id}`}
                        state={{ consultaData: consulta.data, consultaHora: consulta.hora }}
                      >
                        Ver Prontuário Completo
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="sem-registros">
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