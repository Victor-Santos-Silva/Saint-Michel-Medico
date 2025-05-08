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

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validação
      if (!prontuarioData.problemaRelatado || !prontuarioData.recomendacaoMedico) {
        return alert("Preencha todos os campos do prontuário!");
      }

      // Cria prontuário
      const prontuarioResponse = await axios.post(`${urlBase}/prontuario`, {
        ...prontuarioData,
        usuario_id: id
      });
      setProntuario(prontuarioResponse.data.prontuario);

      // Deleta agendamento
      await axios.delete(`${urlBase}/agendamento/${id}`);

      alert("Consulta finalizada e agendamento removido com sucesso!");
      window.location.href = "/home";
    } catch (error) {
      console.error("Erro detalhado:", {
        message: error.message,
        response: error.response?.data
      });

      if (error.response?.status === 404) {
        alert("Agendamento não encontrado");
      } else {
        alert(error.response?.data?.message || "Erro ao processar");
      }
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Confirmar que o paciente não compareceu?")) return;
  
    try {
      const response = await axios.delete(`${urlBase}/agendamento/${id}`);
      console.log("Resposta:", response.data);
      alert("Agendamento removido com sucesso!");
      window.location.href = "/home";
    } catch (error) {
      console.error("Detalhes do erro:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 404) {
        alert("Agendamento não encontrado");
      } else {
        alert(error.response?.data?.message || "Falha na comunicação com o servidor");
      }
    }
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
