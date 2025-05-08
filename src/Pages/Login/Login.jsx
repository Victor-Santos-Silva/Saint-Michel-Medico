import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email_corporativo: '',
        novaSenha: ''
    });
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
        email_corporativo: false,
        novaSenha: false
    });

    const { login } = useAuth();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false });

    };

    const handleForgotPasswordChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        setForgotPasswordErrors(prev => ({
            ...prev,
            [name]: false
        }));

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

            toast.error('Preencha todos os campos!');
            setError({ crm: !formData.crm, senha_corporativa: !formData.senha_corporativa });

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

            setFormData({ crm: '', senha_corporativa: '' });

            toast.success('Login realizado com sucesso!', {
                onClose: () => navigate('/home')
            });

        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);
            setError({ crm: true, senha_corporativa: true });
            toast.error(error.response?.data?.error || 'Erro no login. Tente novamente.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // Validações
        const errors = {
            email_corporativo: !forgotPasswordData.email_corporativo,
            novaSenha: !forgotPasswordData.novaSenha || forgotPasswordData.novaSenha.length < 6
        };

        setForgotPasswordErrors(errors);

        if (errors.email_corporativo || errors.novaSenha) {
            if (errors.email_corporativo) toast.error('Email é obrigatório!');
            if (errors.novaSenha) toast.error('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        try {
            const response = await axios.patch('http://localhost:5000/medico/esqueciSenha', {
                email_corporativo: forgotPasswordData.email_corporativo,
                novaSenha: forgotPasswordData.novaSenha
            });

            toast.success('Senha alterada com sucesso!');
            setShowForgotPassword(false);
            setForgotPasswordData({ crm: '', novaSenha: '' });
        } catch (error) {
            const errorMsg = error.response?.data?.error || 'Erro ao redefinir senha';
            toast.error(errorMsg);

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

        <div className="background">
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <form className='formularioLogin' onSubmit={handleSubmit}>
                <h2>Login Médico</h2>
                
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
                    {error.crm && <span className="error-message">Campo obrigatório</span>}
                </div>
                
                <div className="form-group">
                    <label htmlFor="senha">SENHA:</label>
                    <input
                        type="password"
                        name="senha_corporativa"
                        className={`form-control ${error.senha_corporativa ? 'erro' : ''}`}
                        id="senha"
                        placeholder="Informe a sua senha"
                        value={formData.senha_corporativa}
                        onChange={handleChange}
                    />
                    {error.senha_corporativa && <span className="error-message">Campo obrigatório</span>}
                </div>
                
                <button type="submit" className="botaoEntrar">Entrar</button>
                
                <button 
                    type="button" 
                    className="botaoEsqueciSenha"
                    onClick={() => setShowForgotPassword(true)}
                >
                    Esqueci a senha
                </button>
            </form>

            {showForgotPassword && (
               <div className="modal-overlay">
               <div className="modal-content">
                   <div className="modal-header">
                       <h3>Redefinição de Senha Médica</h3>
                       <button 
                           className="close-button"
                           onClick={() => {
                               setShowForgotPassword(false);
                               setForgotPasswordData({ email_corporativo: '', novaSenha: '' });
                               setForgotPasswordErrors({ email_corporativo: false, novaSenha: false });
                           }}
                       >
                           &times;
                       </button>
                   </div>
                   
                   <form onSubmit={handlePasswordReset} className="password-reset-form">
                       <div className="form-group">
                           <label className="input-label">Email Corporativo</label>
                           <input
                               type="email"
                               name="email_corporativo"
                               placeholder="seu.email@hospital.com"
                               value={forgotPasswordData.email_corporativo}
                               onChange={handleForgotPasswordChange}
                               className={`form-input ${forgotPasswordErrors.email_corporativo ? 'input-error' : ''}`}
                           />
                           {forgotPasswordErrors.email_corporativo && (
                               <span className="error-message">
                                   <i className="error-icon">!</i> Email é obrigatório
                               </span>
                           )}
                       </div>
                       
                       <div className="form-group">
                           <label className="input-label">Nova Senha</label>
                           <div className="password-input-container">
                               <input
                                   type="password"
                                   name="novaSenha"
                                   placeholder="••••••"
                                   value={forgotPasswordData.novaSenha}
                                   onChange={handleForgotPasswordChange}
                                   className={`form-input ${forgotPasswordErrors.novaSenha ? 'input-error' : ''}`}
                               />
                               <span className="password-hint">Mínimo 6 caracteres</span>
                           </div>
                           {forgotPasswordErrors.novaSenha && (
                               <span className="error-message">
                                   <i className="error-icon">!</i> A senha deve ter pelo menos 6 caracteres
                               </span>
                           )}
                       </div>
                       
                       <div className="button-group">
                           <button 
                               type="button" 
                               className="secondary-button"
                               onClick={() => {
                                   setShowForgotPassword(false);
                                   setForgotPasswordData({ email_corporativo: '', novaSenha: '' });
                                   setForgotPasswordErrors({ email_corporativo: false, novaSenha: false });
                               }}
                           >
                               Cancelar
                           </button>
                           <button type="submit" className="primary-button">
                               Redefinir Senha
                           </button>
                       </div>
                   </form>
               </div>
           </div>
            )}
        </div>
    );
}


