import React, { useEffect, useState, useRef } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const medicoLogadoId = id;
  
  // Refs para as listas
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
        console.log("Agendamentos Usuários:", response.data);
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
        console.log("Agendamentos Docentes:", response.data);
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
      <div className='corpo'>
        <div className='imagensComeco'>
          <img className='LogoVerde' src="../src/Img/LogoVerde.png" alt="" />
          <div>
            <h2 className='titulo'>Consultas</h2>
          </div>
          <div className='lista-container'>
            <button 
              className='nav-button left' 
              onClick={() => scrollLeft(consultasRef)}
              disabled={dataUsuarios.length <= 3}
            >
              &lt;
            </button>
            <div className='listaConsultas' ref={consultasRef}>
              {dataUsuarios.length > 0 ? (
                dataUsuarios.map((item, index) => (
                  <div key={index} className='consultaItem'>
                    <img src={item.usuario?.imagemGenero || '/imagens/default.png'} alt="Paciente" />
                    <p>{item.usuario?.nomeCompleto || 'Nome não disponível'}</p>
                    <p>Data: {item.data || 'Data não informada'}</p>
                    <p>Hora: {item.hora || 'Hora não informada'}</p>
                    {item.usuario?.id && (
                      <Link className='button-prontuario' to={`/prontuario/${item.usuario.id}`}>
                        Prontuário
                      </Link>
                    )}
                  </div>
                ))
              ) : (
                <p className='semPacientes'>Nenhum paciente encontrado.</p>
              )}
            </div>
            <button 
              className='nav-button right' 
              onClick={() => scrollRight(consultasRef)}
              disabled={dataUsuarios.length <= 3}
            >
              &gt;
            </button>
          </div>
        </div>
        <br />
      </div>

      <div className='imagensComeco'>
        <h2 className='titulo'>Consultas de Parentesco</h2>
        <div className='lista-container'>
          <button 
            className='nav-button left' 
            onClick={() => scrollLeft(parentescoRef)}
            disabled={dataDocentes.length <= 3}
          >
            &lt;
          </button>
          <div className='listaConsultas' ref={parentescoRef}>
            {dataDocentes.length > 0 ? (
              dataDocentes.map((item, index) => (
                <div key={index} className='consultaItem'>
                  <img src={item.imagemGenero || '/imagens/default.png'} alt="Paciente" />
                  <p>{item.nomeCompleto || 'Nome não disponível'}</p>
                  <p>Data: {item.data || 'Data não informada'}</p>
                  <p>Hora: {item.hora || 'Hora não informada'}</p>
                  {item.usuario?.id && (
                    <Link className='button-prontuario' to={`/prontuarioDocente/${item.id}`}>
                      Prontuário
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <p className='semPacientes'>Nenhum Parentesco encontrado.</p>
            )}
          </div>
          <button 
            className='nav-button right' 
            onClick={() => scrollRight(parentescoRef)}
            disabled={dataDocentes.length <= 3}
          >
            &gt;
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}