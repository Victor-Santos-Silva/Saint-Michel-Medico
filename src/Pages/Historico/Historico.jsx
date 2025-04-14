import React, { useEffect, useState } from 'react';
import './Historico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Historico() {
  const [consultasPassadasUsuarios, setConsultasPassadasUsuarios] = useState([]);
  const [consultasPassadasDocentes, setConsultasPassadasDocentes] = useState([]);
  const { id } = useAuth();
  const medicoLogadoId = id;

  useEffect(() => {
    // Buscar consultas passadas de usuários
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

    // Buscar consultas passadas de docentes
    axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`)
      .then(response => {
        if (response.data && Array.isArray(response.data.agendamentoDocentes)) {
          const consultasPassadas = response.data.agendamentoDocentes.filter(consulta => {
            const dataHoraConsulta = new Date(`${consulta.data}T${consulta.hora}`);
            return dataHoraConsulta < new Date(); // Filtra apenas consultas com data/hora passadas
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
      <div className='corpo-historico'>
        <h1 className='titulo-principal'>Histórico de Consultas</h1>
        
        {/* Seção de Pacientes Comuns */}
        <div className='secao-historico'>
          <h2 className='titulo-secao'>Pacientes</h2>
          <div className='lista-historico'>
            {consultasPassadasUsuarios.length > 0 ? (
              consultasPassadasUsuarios.map((consulta, index) => (
                <div key={index} className='item-historico'>
                  <div className='info-paciente'>
                    <img 
                      src={consulta.usuario?.imagemGenero || '/imagens/default.png'} 
                      alt="Paciente" 
                      className='foto-paciente'
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
                        className='botao-prontuario' 
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
              <p className='sem-registros'>Nenhuma consulta passada encontrada para pacientes.</p>
            )}
          </div>
        </div>

        {/* Seção de Docentes */}
        <div className='secao-historico'>
          <h2 className='titulo-secao'>Docentes</h2>
          <div className='lista-historico'>
            {consultasPassadasDocentes.length > 0 ? (
              consultasPassadasDocentes.map((consulta, index) => (
                <div key={index} className='item-historico'>
                  <div className='info-paciente'>
                    <img 
                      src={consulta.imagemGenero || '/imagens/default.png'} 
                      alt="Docente" 
                      className='foto-paciente'
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
                        className='botao-prontuario' 
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
              <p className='sem-registros'>Nenhuma consulta passada encontrada para docentes.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}