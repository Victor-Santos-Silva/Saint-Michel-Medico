import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importando o hook de autenticação
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        crm: '',
        senha: ''
    });

    const [error, setError] = useState({
        crm: false,
        senha: false
    });

    const { login } = useAuth(); // Acesso à função login do contexto

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false }); // Remove erro ao digitar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.crm || !formData.senha) {
            alert("Preencha todos os campos!");
            setError({ crm: !formData.crm, senha: !formData.senha });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/medico/login', formData);

            login(response.data.usuario); // Passa o nome do usuário para o contexto

            setFormData({ crm: '', senha: '' }); // Limpa os campos após login

            navigate('/home'); // Indo para a página home
        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);

            setError({
                crm: true,
                senha: true
            });
        }
    };

    return (
        <div className="background">
            <br />
            <form className='formularioLogin' onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="crm">CRM:</label>
                    <input
                        type="text"
                        name="crm"
                        className={`form-control ${error.crm ? 'erro' : ''}`}
                        id="crm"
                        placeholder="Informe o número da sua CRM"
                        value={formData.crm}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">SENHA:</label>
                    <input
                        type="password"
                        name="senha"
                        className={`form-control ${error.senha ? 'erro' : ''}`}
                        id="senha"
                        placeholder="Informe a sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <br />
                <button type="submit" className="botaoEntrar">Entrar</button>
            </form>
        </div>
    );
}
