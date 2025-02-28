import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Pacientes.css";


const pacientes = [
  { name: "Marcinho", hora: '08:30', image: "src/Img/pacienteM.png" },
  { name: "Flavio", hora: '09:15', image: "src/Img/pacienteM.png" },
  { name: "Ellen", hora: '10:00', image: "src/Img/pacienteF.png" },
  { name: "Marcinho", hora: '08:30', image: "src/Img/pacienteM.png" },
  { name: "Flavio", hora: '09:15', image: "src/Img/pacienteM.png" },
  { name: "Ellen", hora: '10:00', image: "src/Img/pacienteF.png" },
  { name: "Marcinho", hora: '08:30', image: "src/Img/pacienteM.png" },
  { name: "Flavio", hora: '09:15', image: "src/Img/pacienteM.png" },
  { name: "Ellen", hora: '10:00', image: "src/Img/pacienteF.png" },
];

const PacienteCard = ({ name, hora, image }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="card-info-pacientes" data-aos="fade-down">
      <img src={image} alt={name} className="paciente-image" />
      <div className="texto-pacientes">
        <h3 className="card-info-h3">{name}</h3>
        <h4 className="card-info-h4">{hora}</h4>

      </div>
      <div className="horarios">
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