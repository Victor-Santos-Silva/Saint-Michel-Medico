import React, { useEffect, useState } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function HomeMedico() {
  const [data, setData] = useState([]);
  const { id } = useAuth();
  const medicoLogadoId = id;

  useEffect(() => {
    axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`)
      .then(response => {
        // Verifica se a resposta tem dados e é um array
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
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
            <h2 className='titulo'>Consultas </h2>
          </div>
          <div className='listaConsultas'>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index} className='consultaItem'>
                  {/* Verificação segura para a imagem */}
                  {item.usuario?.imagemGenero && (
                    <img src={item.usuario.imagemGenero} alt="Paciente" />
                  )}

                  {/* Verificação segura para o nome */}
                  <p>{item.usuario?.nomeCompleto || 'Nome não disponível'}</p>

                  <p>Data: {item.data}</p>
                  <p>Hora: {item.hora}</p>

                  {/* Verificação segura para o link do prontuário */}
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
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}