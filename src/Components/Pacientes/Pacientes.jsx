import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Pacientes.css";


const pacientes = [
  { name: "Marcinho", image: "src/Img/pacienteM.png" },
  { name: "Flavio",  image: "src/Img/pacienteM.png" },
  { name: "Ellen",  image: "src/Img/pacienteF.png" }
];

const PacienteCard = ({ name, image }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="card-info-pacientes" data-aos="fade-down">
      <img src={image} alt={name} className="paciente-image" />
      <div className="texto-pacientes">
        <h3 className="card-info-h3">{name}</h3>
      </div>
      <div className="social-icons">
        <img src="src/Img/icons8-facebook-novo-30.png" alt="Facebook" className="social-icon"/>
        <img src="src/Img/icons8-instagram-30.png" alt="Instagram" className="social-icon"/>
        
      </div>
      <button className="profile-button-pacientes">Visualizar Perfil</button>
    </div>
  );
};

const Pacientes = () => (
  <>
    <div className="card-pacientes" data-aos="fade-up">
      <div className="container-pacientes">
        {pacientes.map((pacientes, index) => (
          <PacienteCard key={index} {...pacientes} />
        ))}
      </div>
    </div>
  </>
);

export default Pacientes;
