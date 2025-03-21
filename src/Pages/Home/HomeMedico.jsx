import React, { useEffect, useState } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext'; // Importe o useAuth
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeMedico() {
  const [data, setData] = useState([]);
  const { id } = useAuth(); // Use o hook useAuth para acessar o ID do médico logado
  const medicoLogadoId = id; // Armazena o ID do médico logado

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        // Filtra os agendamentos pelo ID do médico logado
        const agendamentosDoMedico = response.data.filter(
          agendamento => agendamento.medico_id === parseInt(medicoLogadoId) // Converte para número, se necessário
        );
        setData(agendamentosDoMedico);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error); // Exibe o erro no console
      });
  }, [medicoLogadoId]); // Adiciona medicoLogadoId como dependência

  return (
    <>
      <Header />
      <div className='corpo'>
        <div className='imagensComeco'>
          <img className='LogoVerde' src="../src/Img/LogoVerde.png" alt="" />
          <img className='linha' src="../src/Img/linha.png" alt="" />
          <div>
            <h2 className='titulo'>Consultas </h2>
          </div>
          <div className='listaConsultas'>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className='consultaItem'>
                  {/* <img src={item.Usuario.imagemGenero} alt="" /> */}
                  {/* <p>{item.Usuario.imagemGenero}</p> */}
                  <p>{item.Usuario.nomeCompleto}</p>
                  <p>Data: {item.data}</p>
                  <p>Hora: {item.hora}</p>
                  <Link className='button-prontuario' to='/prontuario'> Prontuario</Link>
                </div>
              ))
            ) : (
              <p className='semPacientes'>Nenhum paciente encontrado.</p>
            )}
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}