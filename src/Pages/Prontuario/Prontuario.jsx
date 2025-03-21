import React, { useEffect, useState } from 'react';
import './Prontuario.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Prontuario = () => {

  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/paciente/${id}`)
      .then(response => {
        setUsuario(response.data.usuario);
        console.log(response.data.usuario);

      })

      .catch(error => console.error("Erro ao buscar prontuário:", error));
  }, [id]);

  if (!usuario) return <p>Carregando...</p>;

  return (
    <>
      <Header />
      <div className='container-prontuario'>
        <h2>Prontuário de {usuario.nomeCompleto}</h2>
        <img src={usuario.imagemGenero} alt="Imagem do Paciente" />
        <p><span className="field-label">Convênio Médico:</span><span> {usuario.convenioMedico}</span></p>
        <p><span className="field-label">CPF:</span><span> {usuario.cpf}</span></p>
        <p><span className="field-label">Data de Nascimento:</span><span> {usuario.dataDeNascimento}</span></p>
        <p><span className="field-label">Email:</span><span> {usuario.email}</span></p>
        <p><span className="field-label">Endereço:</span><span> {usuario.endereco}</span></p>
        <p><span className="field-label">Gênero:</span><span> {usuario.genero}</span></p>
        <p><span className="field-label">Plano de Convênio:</span><span> {usuario.planoConvenio}</span></p>
        <p><span className="field-label">RG:</span><span> {usuario.rg}</span></p>
        <p><span className="field-label">Telefone:</span><span> {usuario.telefone}</span></p>
        <p><span className="field-label">Tipo Sanguíneo:</span><span> {usuario.tipoSanguineo}</span></p>
      </div>
      <Footer />
    </>
  );
};

export default Prontuario;