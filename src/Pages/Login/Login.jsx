import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        crm: '',
        senha_corporativa: ''
    });

    const [error, setError] = useState({
        crm: false,
        senha_corporativa: false
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validação simples
        if (!formData.crm || !formData.senha_corporativa) {
            setError({ 
                crm: !formData.crm, 
                senha_corporativa: !formData.senha_corporativa 
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/medico/login', formData);
            login(response.data.medico, response.data.token, response.data.id);
            navigate('/home');
        } catch (error) {
            console.error('Erro no login:', error);
            setError({ crm: true, senha_corporativa: true });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Acesso Médico</h1>
                    <p className="login-subtitle">Informe suas credenciais para acessar o sistema</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="crm" className="form-label">CRM</label>
                        <input
                            type="text"
                            name="crm"
                            id="crm"
                            className={`form-input ${error.crm ? 'erro' : ''}`}
                            placeholder="Digite seu CRM"
                            value={formData.crm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha" className="form-label">Senha Corporativa</label>
                        <input
                            type="password"
                            name="senha_corporativa"
                            id="senha"
                            className={`form-input ${error.senha_corporativa ? 'erro' : ''}`}
                            placeholder="Digite sua senha"
                            value={formData.senha_corporativa}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Carregando...
                            </>
                        ) : 'Entrar'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Problemas com acesso? Contate o administrador</p>
                </div>
            </div>
        </div>
    );
}