import React, { useEffect, useState } from 'react';
import './Prontuario.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Prontuario = () => {
  const { darkMode } = useTheme();

  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [prontuario, setProntuario] = useState(null);
  const [prontuarioData, setProntuarioData] = useState({
    problemaRelatado: '',
    recomendacaoMedico: '',
  });

  const urlBase = 'http://localhost:5000'

  useEffect(() => {
    // Buscar dados do usuário
    axios.get(`${urlBase}/paciente/${id}`)
      .then(response => {
        setUsuario(response.data.usuario);
      })
      .catch(error => console.error("Erro ao buscar usuário:", error));
  }, [id]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const prontuarioComUsuario = {
      ...prontuarioData,
      usuario_id: id, // id do paciente
    };

    axios.post(`${urlBase}/prontuario`, prontuarioComUsuario)
      .then(response => {
        setProntuario(response.data.prontuario);
        alert("Prontuário criado com sucesso!");

        // Finalizar consulta e atualizar lista na homepage
        axios.delete(`${urlBase}/agendamento/${id}`)
          .then(() => {
            // Chama a função passada para a remoção do paciente da lista de consultas
            atualizarConsultas(id);
            alert("Consulta finalizada e removida.");
          })
          .catch(error => {
            console.error("Erro ao finalizar consulta:", error);
          });
      })
      .catch(error => {
        console.error("Erro ao criar prontuário:", error);
        alert("Erro ao criar prontuário.");
      });
  };


  const handleDelete = () => {
    // Deletar prontuário
    axios.delete(`${urlBase}/prontuario/${id}`)
      .then(response => {
        setProntuario(null); // Limpar o estado do prontuário após a exclusão
        alert("Prontuário deletado com sucesso!");
      })
      .catch(error => {
        console.error("Erro ao deletar prontuário:", error);
        alert("Erro ao deletar prontuário.");
      });
  };
  // Associando os campos de texto ao estado
  const handleInputChange = (e) => {
    setProntuarioData({
      ...prontuarioData,
      [e.target.name]: e.target.value,
    });
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <br /><br /><br />
      <div className={`container-prontuario ${darkMode ? 'dark-mode' : ''}`}>
        <h2>Prontuário</h2>

        <div className="prontuario-top">
          <img
            src={usuario.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
            alt="Imagem do Paciente"
            className={darkMode ? 'dark-img' : ''}
          />

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

        <div className="prontuario-observacoes">
          <div className="observacao-group">
            <label>Problema relatado:</label>
            <textarea
              className={`observacao-input ${darkMode ? 'dark-mode' : ''}`}
              rows="4"
              name="problemaRelatado"
              value={prontuarioData.problemaRelatado}
              onChange={handleInputChange}
              placeholder="Descreva o problema relatado pelo paciente..."
            />
          </div>

          <div className="observacao-group">
            <label>Recomendação Médica:</label>
            <textarea
              className={`observacao-input ${darkMode ? 'dark-mode' : ''}`}
              rows="4"
              name="recomendacaoMedico"
              value={prontuarioData.recomendacaoMedico}
              onChange={handleInputChange}
              placeholder="Insira as recomendações médicas..."
            />
          </div>
        </div>

        <div className="prontuario-actions">
          <button className={`btn-missing ${darkMode ? 'dark-mode' : ''}`} onClick={handleDelete}>
            Paciente não compareceu
          </button>
          <button className={`btn-finish ${darkMode ? 'dark-mode' : ''}`} onClick={handlePostSubmit}>
            Finalizar Consulta
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prontuario;
