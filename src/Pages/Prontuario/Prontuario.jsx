import React, { useEffect, useState } from 'react';
import './Prontuario.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Prontuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/paciente/${id}`)
      .then(response => {
        setUsuario(response.data.usuario);
      })
      .catch(error => console.error("Erro ao buscar prontuário:", error));
  }, [id]);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <br /><br /><br />
      <div className='container-prontuario'>
        <h2>Prontuário</h2>
        
        <div className="prontuario-top">
          <img src={usuario.imagemGenero} alt="Imagem do Paciente" />
          
          <div className="prontuario-info">
            <div className="prontuario-col">
              <p><span className="field-label">Nome Completo:</span> {usuario.nomeCompleto}</p>
              <p><span className="field-label">Data de Nascimento:</span> {usuario.dataDeNascimento}</p>
              <p><span className="field-label">RG:</span> {usuario.rg}</p>
              <p><span className="field-label">CPF:</span> {usuario.cpf}</p>
              <p><span className="field-label">Endereço:</span> {usuario.endereco}</p>
              <p><span className="field-label">Telefone:</span> {usuario.telefone}</p>
            </div>
            
            <div className="prontuario-col">
              <p><span className="field-label">Email:</span> {usuario.email}</p>
              <p><span className="field-label">Gênero:</span> {usuario.genero}</p>
              <p><span className="field-label">Convênio:</span> {usuario.convenioMedico}</p>
              <p><span className="field-label">Plano do Convênio:</span> {usuario.planoConvenio}</p>
              <p><span className="field-label">Tipo Sanguíneo:</span> {usuario.tipoSanguineo}</p>
            </div>
          </div>
        </div>

        {/* Seção de Observações */}
        <div className="prontuario-observacoes">
          <div className="observacao-group">
            <label>Problema relatado:</label>
            <textarea 
              className="observacao-input"
              rows="4"
              placeholder="Descreva o problema relatado pelo paciente..."
            />
          </div>

          <div className="observacao-group">
            <label>Recomendação Médica:</label>
            <textarea 
              className="observacao-input"
              rows="4"
              placeholder="Insira as recomendações médicas..."
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="prontuario-actions">
          <button className="btn-missing">
            Paciente não compareceu
          </button>
          <button className="btn-finish">
            Finalizar Consulta
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prontuario;