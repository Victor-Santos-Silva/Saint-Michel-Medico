import React, { useEffect, useState } from 'react';
import './ConsultasPassadas.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Historico() {
  const { darkMode } = useTheme();
  const [prontuarios, setProntuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/consulta/historico")
      .then(response => {
        console.log(response.data); // Verifica a estrutura da resposta

        setProntuarios(response.data); // Extrai o array da resposta
      })
      .catch(error => {
        console.error("Erro ao buscar consultas passadas de usuários:", error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="consultas-container">
        <h2>Consultas Passadas</h2>

        {prontuarios.length === 0 ? (
          <p>Nenhuma consulta registrada.</p>
        ) : (
          <div className="grid-prontuarios">
            {prontuarios.map((item) => (
              <div className="card-prontuario" key={item.id}>
                <img
                  src={`${item.usuario.imagemGenero}`}
                  alt={`Foto de ${item.usuario.nomeCompleto}`}
                  className="imagem-genero"
                />
                <p className='testoTeste'><strong>Paciente:</strong> {item.usuario.nomeCompleto}</p>
                <p className='testoTeste'>
                  <strong>Problema:</strong> {item.Prontuario?.problemaRelatado || "Não informado"}
                </p>
                <p className='testoTeste'>
                  <strong>Recomendação:</strong> {item.Prontuario?.recomendacaoMedico || "Não informada"}
                </p>
                <p className='testoTeste'>
                  <strong>Status:</strong> {item.status || "Não informada"}
                </p>
                <p className='testoTeste'>
                  <strong>Data:</strong> {item.Prontuario?.createdAt ? new Date(item.Prontuario.createdAt).toLocaleDateString() : "Não informada"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}