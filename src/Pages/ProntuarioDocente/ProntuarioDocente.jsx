import React, { useEffect, useState } from 'react';
import './ProntuarioDocente.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Prontuario = () => {
  const { isDarkMode: darkMode, toggleTheme } = useTheme();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [prontuarioData, setProntuarioData] = useState({
    problemaRelatado: '',
    recomendacaoMedico: '',
  });

  const urlBase = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${urlBase}/agendamentoDocente/${id}`)
      .then(response => {
        const agendamento = response.data.AgendamentosDocentes;
        setUsuario(agendamento);
        console.log("Dados do agendamento:", agendamento);
      })
      .catch(error => console.error("Erro ao buscar agendamento:", error));
  }, [id]);

  const handleFinalizarConsulta = async (e) => {
    e.preventDefault();

    try {
      if (!prontuarioData.problemaRelatado || !prontuarioData.recomendacaoMedico) {
        return alert("Preencha todos os campos do prontuário!");
      }

      await axios.post(`${urlBase}/consultaDocente/concluir-parente`, {
        agendamento_id: id,
        ...prontuarioData
      });
      alert("Consulta finalizada com sucesso!");
      window.location.href = "/home";
    } catch (error) {
      console.error("Erro ao finalizar consulta:", error);
      alert("Erro ao finalizar consulta.");
    }
  };

  const handleNaoCompareceu = async () => {
    try {
      await axios.post(`${urlBase}/consultaDocente/nao-compareceu-parente`, {
        agendamento_id: id
      });

      alert("Paciente não compareceu!");
      window.location.href = "/home";
    } catch (error) {
      console.error("Erro ao marcar como não comparecido:", error);
      alert("Erro ao processar.");
    }
  };

  const handleInputChange = (e) => {
    setProntuarioData({
      ...prontuarioData,
      [e.target.name]: e.target.value,
    });
  };

  if (!usuario) return <p className={darkMode ? 'dark-text' : ''}>Carregando...</p>;

  return (
    <>
      <Header />
      <br /><br /><br />
      <div className={`container-prontuario ${darkMode ? 'dark-mode' : ''}`}>
        <div className="theme-toggle-container">
        </div>

        <h2 className={`titleProntuario ${darkMode ? 'dark-mode' : ''}`}>Prontuário</h2>

        <div className="prontuario-top">
          <img
            src={usuario.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
            alt="Imagem do Paciente"
            className={darkMode ? 'dark-img' : ''}
          />

          <div className="prontuario-info">
            <div className="prontuario-col">
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Nome Completo:</span> {usuario.nomeCompleto}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Data de Nascimento:</span> {usuario.dataDeNascimento}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>RG:</span> {usuario.rg}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>CPF:</span> {usuario.cpf}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Endereço:</span> {usuario.endereco}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Telefone:</span> {usuario.telefone}</p>
            </div>

            <div className="prontuario-col">
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Email:</span> {usuario.email}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Gênero:</span> {usuario.genero}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Convênio:</span> {usuario.convenioMedico}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Plano do Convênio:</span> {usuario.planoConvenio}</p>
              <p className={darkMode ? 'dark-text' : ''}><span className={`field-label ${darkMode ? 'dark-text' : ''}`}>Tipo Sanguíneo:</span> {usuario.tipoSanguineo}</p>
            </div>
          </div>
        </div>

        <div className="prontuario-observacoes">
          <div className="observacao-group">
            <label className={darkMode ? 'dark-text' : ''}>Problema relatado:</label>
            <textarea
              className={`observacao-input ${darkMode ? 'dark-textarea' : ''}`}
              rows="4"
              name="problemaRelatado"
              value={prontuarioData.problemaRelatado}
              onChange={handleInputChange}
              placeholder="Descreva o problema relatado pelo paciente..."
            />
          </div>

          <div className="observacao-group">
            <label className={darkMode ? 'dark-text' : ''}>Recomendação Médica:</label>
            <textarea
              className={`observacao-input ${darkMode ? 'dark-textarea' : ''}`}
              rows="4"
              name="recomendacaoMedico"
              value={prontuarioData.recomendacaoMedico}
              onChange={handleInputChange}
              placeholder="Insira as recomendações médicas..."
            />
          </div>
        </div>

        <div className="prontuario-actions">
          <button 
            className={`btn-missing ${darkMode ? 'dark-btn' : ''}`} 
            onClick={handleNaoCompareceu}
          >
            Paciente não compareceu
          </button>
          <button 
            className={`btn-finish ${darkMode ? 'dark-btn' : ''}`} 
            onClick={handleFinalizarConsulta}
          >
            Finalizar Consulta
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prontuario;