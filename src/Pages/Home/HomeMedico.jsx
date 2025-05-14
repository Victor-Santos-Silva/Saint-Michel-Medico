import React, { useEffect, useState } from 'react';
import './HomeMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FiCalendar, FiClock, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { FaStethoscope, FaUserMd, FaNotesMedical } from 'react-icons/fa';
import LogoVerde from '../../Img/LogoVerde.png';
import { RiFileList2Fill } from 'react-icons/ri';

export default function HomeMedico() {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [dataDocentes, setDataDocentes] = useState([]);
  const { id } = useAuth();
  const { darkMode } = useTheme();
  const medicoLogadoId = id;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
      easing: 'ease-in-out-quart'
    });
  }, []);


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Resetar horas para comparar apenas a data

        const response = await axios.get(`http://localhost:5000/agendamento/listar?medico_id=${medicoLogadoId}`);

        if (Array.isArray(response.data)) {
          const agendamentosFiltrados = response.data.filter(a => {
            if (!a.data) return false;

            const dataAgendamento = new Date(a.data);
            dataAgendamento.setHours(0, 0, 0, 0); // Para garantir que a comparação funcione corretamente

            return (
              a.status !== 'finalizado' &&
              a.status !== 'nao_compareceu' &&
              dataAgendamento >= hoje
            );
          });
          setDataUsuarios(agendamentosFiltrados);
        }

      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, [medicoLogadoId]);


  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); // Zera horas

        const response = await axios.get(`http://localhost:5000/agendamentoDocente/agendamentoGeralDocente?medico_id=${medicoLogadoId}`);

        // Verifica se a resposta é um array ou contém a lista dentro de outra propriedade
        const agendamentos = Array.isArray(response.data)
          ? response.data
          : (Array.isArray(response.data.agendamentoDocentes)
            ? response.data.agendamentoDocentes
            : []);

        const agendamentosFiltrados = agendamentos.filter(a => {
          if (!a.data) return false;

          const dataAgendamento = new Date(a.data);
          dataAgendamento.setHours(0, 0, 0, 0);

          return (
            a.status !== 'finalizado' &&
            a.status !== 'nao_compareceu' &&
            dataAgendamento >= hoje
          );
        });

        setDataDocentes(agendamentosFiltrados);

      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAgendamentos();
  }, [medicoLogadoId]);

  return (
    <>
      <Header />
      <img src={LogoVerde} alt="Logo Verde" className='imgHome' />
      {dataUsuarios.length > 0 ? (
        <div className="agendamentos">
          <h2 className='titleHome'>Agendamentos</h2>
          {dataUsuarios.map((usuario) => (
            <div key={usuario.id} className="agendamento-card">
              <div className="card-header">
                <img
                  src={usuario.usuario.imagemGenero || (darkMode ? '/imagens/default-dark.png' : '/imagens/default.png')}
                  alt="Imagem do Paciente"
                  className={darkMode ? 'dark-img' : ''}
                />
                <h3>{usuario.usuario.nomeCompleto}</h3>
              </div>
              <div className="card-body">
                <p><FiCalendar /> Data: {new Date(usuario.data).toLocaleDateString('pt-BR')}</p>
                <p><FiClock /> Horário: {usuario.hora}</p>
                <p><RiFileList2Fill /> Status: {usuario.status}</p>
              </div>
              <Link to={`/prontuario/${usuario.id}`} className="botao-prontuario">
                Prontuario
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-agendamentos">
          <h2>Nenhum agendamento encontrado</h2>
        </div>
      )
      }
      <Footer />
    </>
  );
}