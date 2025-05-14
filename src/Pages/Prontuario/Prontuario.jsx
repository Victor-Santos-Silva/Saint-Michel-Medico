import React, { useEffect, useState } from 'react';
import './Prontuario.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';

const Prontuario = () => {
  const { darkMode } = useTheme();
  const { id } = useParams(); // ID do agendamento
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [prontuarioData, setProntuarioData] = useState({
    problemaRelatado: '',
    recomendacaoMedico: '',
  });

  const urlBase = 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${urlBase}/agendamento/${id}`)
      .then(response => {
        const agendamento = response.data.AgendamentosUsuarios;
        setUsuario(agendamento.usuario);
        console.log("Dados do agendamento:", agendamento);
      })
      .catch(error => console.error("Erro ao buscar agendamento:", error));
  }, [id]);

  const handleFinalizarConsulta = async (e) => {
    e.preventDefault();

    if (!prontuarioData.problemaRelatado || !prontuarioData.recomendacaoMedico) {
      return toast.warn("Preencha todos os campos do prontuário!");
    }

    try {
      await axios.post(`${urlBase}/consulta/concluir`, {
        agendamento_id: id,
        ...prontuarioData
      });

      toast.success("Consulta finalizada com sucesso!");
      setTimeout(() => navigate('/home'), 2000); // redireciona após toast
    } catch (error) {
      console.error("Erro ao finalizar consulta:", error);
      toast.error("Erro ao finalizar consulta.");
    }
  };

  const handleNaoCompareceu = async () => {
    try {
      await axios.post(`${urlBase}/consulta/nao-compareceu`, {
        agendamento_id: id
      });

      toast.info("Paciente não compareceu!");
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      console.error("Erro ao marcar como não comparecido:", error);
      toast.error("Erro ao processar.");
    }
  };

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
      <div className={`container-prontuario ${darkMode ? 'dark-mode' : ''}`}>
        <h2 className='titleProntuario'>Prontuário</h2>

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
          <button className={`btn-missing ${darkMode ? 'dark-mode' : ''}`} onClick={handleNaoCompareceu}>
            Paciente não compareceu
          </button>
          <button className={`btn-finish ${darkMode ? 'dark-mode' : ''}`} onClick={handleFinalizarConsulta}>
            Finalizar Consulta
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Prontuario;
