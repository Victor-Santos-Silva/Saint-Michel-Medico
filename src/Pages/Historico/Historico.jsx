import React, { useEffect, useState } from 'react';
import './Historico.css';
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
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/consulta/historico")
      .then(response => {
        setProntuarios(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar consultas passadas de usuários:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/consultaDocente/historico-parente")
      .then(response => {
        setProntuarioParente(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar consultas passadas de usuários:", error);
      });
  }, []);

  return (
    <div className={`page-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <Header />
      <div className="content-wrap">
        <div className="consultas-container" data-aos="fade-up">
          <h2>Consultas Passadas</h2>

          {prontuarios.length === 0 && prontuarioParente.length === 0 ? (
            <div className="no-consultas-message">
              <p>Nenhuma consulta registrada.</p>
            </div>
          ) : (
            <>
              {prontuarios.length > 0 && (
                <div className="grid-prontuarios">
                  {prontuarios.map((item) => (
                    <div 
                      className="card-prontuario" 
                      key={`u-${item.id}`}
                      data-aos="fade-up"
                    >
                      <img
                        src={item.usuario.imagemGenero}
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
                    <div 
                      className="card-prontuario" 
                      key={`p-${item.id}`}
                      data-aos="fade-up"
                    >
                      <img
                        src={item.imagemGenero}
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
      </div>
      <Footer />
    </div>
  );
}