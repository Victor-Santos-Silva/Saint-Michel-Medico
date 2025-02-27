import React from 'react'
 import './HomeMedico.css' 
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'

const pacientes = [
  { nome: "Maria Eduarda", img: "src/Img/pacienteF.png" },
  { nome: "Marcos Santo", img: "use.png" },
  { nome: "Tuco Salamanca", img: "use.png" },
  { nome: "Gisele Amanda", img: "us.png" },
  { nome: "Dalcio do Santos", img: "use.png" },
  { nome: "Heisenberg", img: "use.png" },
  { nome: "Joana Dias", img: "us.png" },
  { nome: "João Freitas", img: "use.png" },
  { nome: "Tito", img: "use.png" },
  { nome: "Diana Santos", img: "us.png" },
  { nome: "Felipe Tito", img: "use.png" },
  { nome: "Salvador da Rima", img: "use.png" },
];

export default function HomeMedico() {
  return (<>
  <Header/>
    <div className="consultas-container">
      <h2 className="titulo-consultas">CONSULTAS</h2>
      <div className="grid-consultas">
        {pacientes.map((paciente, index) => (
          <div key={index} className="card-consulta">
            <br />
            <br /><br />
            <img src={`/img/${paciente.img}`} alt={paciente.nome} className="imagem-paciente" />
            <p className="nome-paciente">{paciente.nome}</p>
            <button className="btn-perfil">Visualizar Perfil</button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
    );
  
  
  }