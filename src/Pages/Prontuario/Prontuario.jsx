import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import './Prontuario.css'

const Prontuario = () => {
    const pacientes = [
        {
          nome: "Maria Santos",
          prontuario: "9085484",
          idade: "39 anos",
          genero: "Mulher",
          img: "user-fem.png",
        },
        {
          nome: "Olivera Prado",
          prontuario: "9874110",
          idade: "32 anos",
          genero: "Homem",
          img: "user-masc.png",
        },
        {
          nome: "Maria Santos",
          prontuario: "9085484",
          idade: "39 anos",
          genero: "Mulher",
          img: "user-fem.png",
        },
      ];
      
  return (
    <>
    <Header/>
    <img src="src/Img/LogoVerde.png" className="img-servicos" />
    <div className="prontuario-container">
    <h2 className="prontuario-consultas">PRONTUÁRIO</h2>
    <div className="container-pacientes">
      {pacientes.map((paciente, index) => (
        <div key={index} className="card-paciente">
          <div className="info-paciente">
            <img
              src={`/img/${paciente.img}`}
              alt={paciente.nome}
              className="foto-paciente"
            />
            <div>
              <p className="nome-paciente">{paciente.nome}</p>
              <p>Prontuário: {paciente.prontuario}</p>
              <p>{paciente.idade}</p>
              <p>{paciente.genero}</p>
            </div>
          </div>

          <div className="detalhes-paciente">
            <div className="dados">
              <p>Nascimento:</p>
              <p>Gênero:</p>
              <p>Telefone:</p>
              <p>CPF:</p>
              <p>Email:</p>
              <p>Endereço:</p>
            </div>
            <div className="anexos">
              <p>Anexos do Paciente</p>
            </div>
          </div>

          <div className="observacoes">
            <p>Observações</p>
          </div>

          <div className="rodape-paciente">
            <p>Data</p>
            <p>Anexo do paciente</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Prontuario