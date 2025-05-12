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
  const [prontuarios, setProntuarios] = useState([]);
  const [prontuarioParente, setProntuarioParente] = useState([]);

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

  useEffect(() => {
    axios.get("http://localhost:5000/consultaDocente/historico-parente")
      .then(response => {
        console.log(response.data); // Verifica a estrutura da resposta

        setProntuarioParente(response.data); // Extrai o array da resposta
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

        {prontuarios.length === 0 && prontuarioParente.length === 0 ? (
          <p>Nenhuma consulta registrada.</p>
        ) : (
          <>
            {prontuarios.length > 0 && (
              <div className="grid-prontuarios">
                {prontuarios.map((item) => (
                  <div className="card-prontuario" key={`u-${item.id}`}>
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

            {prontuarioParente.length > 0 && (
              <div className="grid-prontuarios">
                {prontuarioParente.map((item) => (
                  <div className="card-prontuario" key={`p-${item.id}`}>
                    <img
                      src={`${item.imagemGenero}`}
                      alt={`Foto de ${item.nomeCompleto}`}
                      className="imagem-genero"
                    />
                    <p className='testoTeste'><strong>Paciente:</strong> {item.nomeCompleto}</p>
                    <p className='testoTeste'>
                      <strong>Problema:</strong> {item.ProntuarioDocente?.problemaRelatado || "Não informado"}
                    </p>
                    <p className='testoTeste'>
                      <strong>Recomendação:</strong> {item.ProntuarioDocente?.recomendacaoMedico || "Não informada"}
                    </p>
                    <p className='testoTeste'>
                      <strong>Status:</strong> {item.status || "Não informada"}
                    </p>
                    <p className='testoTeste'>
                      <strong>Data:</strong> {item.ProntuarioDocente?.createdAt
                        ? new Date(item.ProntuarioDocente.createdAt).toLocaleDateString()
                        : "Não informada"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
      <Footer />
    </>
  );
}