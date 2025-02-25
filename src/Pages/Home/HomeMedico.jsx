import React from 'react'
 import './HomeMedico.css' 
import Header from '../../Components/Header/Header'
import Pacientes from '../../Components/Pacientes/Pacientes'
export default function HomeMedico() {
  return (
    
    < >
    <Header/>
    <div className='corpo'>
        <div className='imagensComeco'>
        <img className='LogoVerde' src="../src/Img/LogoVerde.png" alt="" />
        <img className='linha' src="../src/Img/linha.png" alt="" />

        <div> <h2 className='titulo'>Consultas </h2></div>
        <Pacientes/>
        </div>
    </div>
    </>
  )
}
