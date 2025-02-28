import React, { useState } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './Prontuario.css';

const Prontuario = () => {
  const [paciente, setPaciente] = useState({
    nome: "Maria Santos",
    idade: "30 anos",
    prontuario: "9965484",
    genero: "",
    img: "src/Img/pacienteF.png",
    nascimento: "",
    telefone: "",
    cpf: "",
    email: "",
    endereco: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  return (
    <>
      <Header />
      <img src="src/Img/LogoVerde.png" className="img-servicos" alt="Logo" />
      <h2 className="prontuario-consultas">PRONTUÁRIO</h2>
      <div className="prontuario-container">
        <div className="paciente-card">
          <div className="paciente-info">
            <div className="paciente-dados">
              <img src={paciente.img} alt={paciente.nome} className="paciente-foto" />
              <div className="paciente-textos">
                <p><strong>{paciente.nome}</strong></p>
                <p>{paciente.idade}</p>
                <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
                <p className={`genero-${paciente.genero.toLowerCase()}`}>{paciente.genero}</p>
              </div>
            </div>
          </div>

          <div className="paciente-detalhes">
            <div className="linha">
              <div className="campo">
                <label>CPF</label>
                <input type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={paciente.telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={paciente.nascimento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Gênero</label>
                <input type="text" name="genero" value={paciente.genero} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo grande">
                <label>Email</label>
                <input type="email" name="email" value={paciente.email} onChange={handleChange} />
              </div>
              <div className="campo grande">
                <label>Endereço</label>
                <input type="text" name="endereco" value={paciente.endereco} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="observacoes">
            <div className="observacoes-topo">Observações</div>
            <div className="observacoes-conteudo"></div>
          </div>

          <div className="anexos">
            <p>Anexos do Paciente</p>
          </div>

          <div className="paciente-rodape">
            <p className='Data'><strong>Data</strong></p>
            <p className='Anexo'><strong>Anexo do paciente</strong></p>
          </div>
        </div>

        
      </div>

      <div className="prontuario-container">
        <div className="paciente-card">
          <div className="paciente-info">
            <div className="paciente-dados">
              <img src={paciente.img} alt={paciente.nome} className="paciente-foto" />
              <div className="paciente-textos">
                <p><strong>{paciente.nome}</strong></p>
                <p>{paciente.idade}</p>
                <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
                <p className={`genero-${paciente.genero.toLowerCase()}`}>{paciente.genero}</p>
              </div>
            </div>
          </div>

          <div className="paciente-detalhes">
            <div className="linha">
              <div className="campo">
                <label>CPF</label>
                <input type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={paciente.telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={paciente.nascimento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Gênero</label>
                <input type="text" name="genero" value={paciente.genero} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo grande">
                <label>Email</label>
                <input type="email" name="email" value={paciente.email} onChange={handleChange} />
              </div>
              <div className="campo grande">
                <label>Endereço</label>
                <input type="text" name="endereco" value={paciente.endereco} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="observacoes">
            <div className="observacoes-topo">Observações</div>
            <div className="observacoes-conteudo"></div>
          </div>

          <div className="anexos">
            <p>Anexos do Paciente</p>
          </div>

          <div className="paciente-rodape">
            <p className='Data'><strong>Data</strong></p>
            <p className='Anexo'><strong>Anexo do paciente</strong></p>
          </div>
        </div>

        
      </div>

      <div className="prontuario-container">
        <div className="paciente-card">
          <div className="paciente-info">
            <div className="paciente-dados">
              <img src={paciente.img} alt={paciente.nome} className="paciente-foto" />
              <div className="paciente-textos">
                <p><strong>{paciente.nome}</strong></p>
                <p>{paciente.idade}</p>
                <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
                <p className={`genero-${paciente.genero.toLowerCase()}`}>{paciente.genero}</p>
              </div>
            </div>
          </div>

          <div className="paciente-detalhes">
            <div className="linha">
              <div className="campo">
                <label>CPF</label>
                <input type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={paciente.telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={paciente.nascimento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Gênero</label>
                <input type="text" name="genero" value={paciente.genero} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo grande">
                <label>Email</label>
                <input type="email" name="email" value={paciente.email} onChange={handleChange} />
              </div>
              <div className="campo grande">
                <label>Endereço</label>
                <input type="text" name="endereco" value={paciente.endereco} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="observacoes">
            <div className="observacoes-topo">Observações</div>
            <div className="observacoes-conteudo"></div>
          </div>

          <div className="anexos">
            <p>Anexos do Paciente</p>
          </div>

          <div className="paciente-rodape">
            <p className='Data'><strong>Data</strong></p>
            <p className='Anexo'><strong>Anexo do paciente</strong></p>
          </div>
        </div>

        
      </div>

      <div className="prontuario-container">
        <div className="paciente-card">
          <div className="paciente-info">
            <div className="paciente-dados">
              <img src={paciente.img} alt={paciente.nome} className="paciente-foto" />
              <div className="paciente-textos">
                <p><strong>{paciente.nome}</strong></p>
                <p>{paciente.idade}</p>
                <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
                <p className={`genero-${paciente.genero.toLowerCase()}`}>{paciente.genero}</p>
              </div>
            </div>
          </div>

          <div className="paciente-detalhes">
            <div className="linha">
              <div className="campo">
                <label>CPF</label>
                <input type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={paciente.telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={paciente.nascimento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Gênero</label>
                <input type="text" name="genero" value={paciente.genero} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo grande">
                <label>Email</label>
                <input type="email" name="email" value={paciente.email} onChange={handleChange} />
              </div>
              <div className="campo grande">
                <label>Endereço</label>
                <input type="text" name="endereco" value={paciente.endereco} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="observacoes">
            <div className="observacoes-topo">Observações</div>
            <div className="observacoes-conteudo"></div>
          </div>

          <div className="anexos">
            <p>Anexos do Paciente</p>
          </div>

          <div className="paciente-rodape">
            <p className='Data'><strong>Data</strong></p>
            <p className='Anexo'><strong>Anexo do paciente</strong></p>
          </div>
        </div>

      </div>
      <div className="prontuario-container">
        <div className="paciente-card">
          <div className="paciente-info">
            <div className="paciente-dados">
              <img src={paciente.img} alt={paciente.nome} className="paciente-foto" />
              <div className="paciente-textos">
                <p><strong>{paciente.nome}</strong></p>
                <p>{paciente.idade}</p>
                <p><strong>Prontuário:</strong> {paciente.prontuario}</p>
                <p className={`genero-${paciente.genero.toLowerCase()}`}>{paciente.genero}</p>
              </div>
            </div>
          </div>

          <div className="paciente-detalhes">
            <div className="linha">
              <div className="campo">
                <label>CPF</label>
                <input type="text" name="cpf" value={paciente.cpf} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Telefone</label>
                <input type="tel" name="telefone" value={paciente.telefone} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo">
                <label>Nascimento</label>
                <input type="date" name="nascimento" value={paciente.nascimento} onChange={handleChange} />
              </div>
              <div className="campo">
                <label>Gênero</label>
                <input type="text" name="genero" value={paciente.genero} onChange={handleChange} />
              </div>
            </div>

            <div className="linha">
              <div className="campo grande">
                <label>Email</label>
                <input type="email" name="email" value={paciente.email} onChange={handleChange} />
              </div>
              <div className="campo grande">
                <label>Endereço</label>
                <input type="text" name="endereco" value={paciente.endereco} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="observacoes">
            <div className="observacoes-topo">Observações</div>
            <div className="observacoes-conteudo"></div>
          </div>

          <div className="anexos">
            <p>Anexos do Paciente</p>
          </div>

          <div className="paciente-rodape">
            <p className='Data'><strong>Data</strong></p>
            <p className='Anexo'><strong>Anexo do paciente</strong></p>
          </div>
        </div>

        
      </div>
      <Footer/>
    </>
  );
};

export default Prontuario;