import React, { useEffect, useState } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';

export default function HomeMedico() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/paciente/`)
      .then(response => {
        setData(response.data.usuario);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error); // Exibe o erro no console
      });
  }, []);


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
          <div>
            {data.length > 0 ? (
              data.map((item, index) => (
                <div key={index}>
                  <p>ID: {item.id}</p>
                  <p>Nome completo:  {item.nomeCompleto}</p>
                  <p>CPF: {item.cpf}</p>
                </div>
              ))
            ) : (
              <p>Nenhum paciente encontrado.</p>
            )}
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}