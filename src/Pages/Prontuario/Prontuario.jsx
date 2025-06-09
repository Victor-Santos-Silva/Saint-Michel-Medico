import React, { useEffect, useState } from 'react';
import './Prontuario.css'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { toast } from 'react-toastify';

const Prontuario = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [prontuarioData, setProntuarioData] = useState({
    problemaRelatado: '',
    recomendacaoMedico: '',
  });

  const urlBase = 'https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net';

  useEffect(() => {
    axios.get(`${urlBase}/agendamento/${id}`)
      .then(response => {
        const agendamento = response.data.AgendamentosUsuarios;
        setUsuario(agendamento.usuario);
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
      setTimeout(() => navigate('/home'), 2000);
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

  if (!usuario) return <div className={`loading ${isDarkMode ? 'dark-mode' : ''}`}>Carregando...</div>;

  return (
    <div className={`theme-root ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <div className={`container-prontuario ${isDarkMode ? 'dark-mode' : ''}`}>
        <h2 className={`titleProntuario ${isDarkMode ? 'dark-mode' : ''}`}>Prontuário</h2>

        <div className="prontuario-top">
          <img
            src={usuario.imagemGenero || (isDarkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
            alt="Imagem do Paciente"
            className={isDarkMode ? 'dark-img' : ''}
          />

          <div className="prontuario-info">
            <div className="prontuario-col">
              {[
                { label: 'Nome Completo:', value: usuario.nomeCompleto },
                { label: 'Data de Nascimento:', value: usuario.dataDeNascimento },
                { label: 'RG:', value: usuario.rg },
                { label: 'CPF:', value: usuario.cpf },
                { label: 'Endereço:', value: usuario.endereco },
                { label: 'Telefone:', value: usuario.telefone }
              ].map((item, index) => (
                <p key={index}>
                  <span className={`field-label ${isDarkMode ? 'dark-mode' : ''}`}>{item.label}</span>
                  <span className={`field-value ${isDarkMode ? 'dark-mode' : ''}`}>{item.value}</span>
                </p>
              ))}
            </div>

            <div className="prontuario-col">
              {[
                { label: 'Email:', value: usuario.email },
                { label: 'Gênero:', value: usuario.genero },
                { label: 'Convênio:', value: usuario.convenioMedico },
                { label: 'Plano do Convênio:', value: usuario.planoConvenio },
                { label: 'Tipo Sanguíneo:', value: usuario.tipoSanguineo }
              ].map((item, index) => (
                <p key={index}>
                  <span className={`field-label ${isDarkMode ? 'dark-mode' : ''}`}>{item.label}</span>
                  <span className={`field-value ${isDarkMode ? 'dark-mode' : ''}`}>{item.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="prontuario-observacoes">
          <div className="observacao-group">
            <label className={`observacao-label ${isDarkMode ? 'dark-mode' : ''}`}>Problema relatado:</label>
            <textarea
              className={`observacao-input ${isDarkMode ? 'dark-mode' : ''}`}
              rows="4"
              name="problemaRelatado"
              value={prontuarioData.problemaRelatado}
              onChange={handleInputChange}
              placeholder="Descreva o problema relatado pelo paciente..."
            />
          </div>

          <div className="observacao-group">
            <label className={`observacao-label ${isDarkMode ? 'dark-mode' : ''}`}>Recomendação Médica:</label>
            <textarea
              className={`observacao-input ${isDarkMode ? 'dark-mode' : ''}`}
              rows="4"
              name="recomendacaoMedico"
              value={prontuarioData.recomendacaoMedico}
              onChange={handleInputChange}
              placeholder="Insira as recomendações médicas..."
            />
          </div>
        </div>

        <div className="prontuario-actions">
          <button className={`btn-missing ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleNaoCompareceu}>
            Paciente não compareceu
          </button>
          <button className={`btn-finish ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleFinalizarConsulta}>
            Finalizar Consulta
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prontuario;