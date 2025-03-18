import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './historico.css';

const Historico = ({ nome, dia, hora, convenio, plano, especialidade, descricao }) => {
  return (
    <>
      <Header />
      <div className="historico-container">
        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>
        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>

        <div className="consulta-card">
          <div className="foto">
            <img src="src/Img/pacienteM.png" alt="Paciente" />
          </div>
          <div className="info">
            <h2>{nome}</h2>
            <p><strong>Dia da consulta:</strong> {dia}</p>
            <p><strong>Hora da consulta:</strong> {hora}</p>
            <p><strong>Convênio:</strong> {convenio}</p>
            <p><strong>Plano do Convênio:</strong> {plano}</p>
            <p><strong>Especialidade:</strong> {especialidade}</p>
            <p><strong>Descrição:</strong> {descricao}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Historico;