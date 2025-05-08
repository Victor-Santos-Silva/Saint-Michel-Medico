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
    axios.get("http://localhost:5000/prontuario")
      .then(response => {
        setProntuarios(response.data.prontuario); // Extrai o array da resposta
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
                <p><strong>Paciente:</strong> {item.usuario.nomeCompleto}</p>
                <p><strong>Problema:</strong> {item.problemaRelatado || "Não informado"}</p>
                <p><strong>Recomendação:</strong> {item.recomendacaoMedico || "Não informada"}</p>
                <p><strong>Data:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}