import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './PerfilMedico.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

export default function PerfilMedico() {
    const { token, id } = useAuth();
    const [medicoData, setMedicoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicoData = async () => {
            try {
                const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/medico/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setMedicoData(response.data);
            } catch (err) {
                console.error("Erro ao buscar dados do médico:", err);
                setError("Erro ao carregar dados do perfil");
            } finally {
                setLoading(false);
            }
        };

        if (token && id) fetchMedicoData();
    }, [token, id]);

    const formatarDataNascimento = (data) => {
        if (!data) return 'Não informada';
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    const formatarCPF = (cpf) => {
        if (!cpf) return 'Não informado';
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const formatarTelefone = (telefone) => {
        if (!telefone) return 'Não informado';
        return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    };

    if (loading) {
        return <div className="loading">Carregando perfil...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!medicoData) {
        return <p className='carregando'>Carregando...</p>;
    }

    return (
        <>
            <Header />
            <div className='perfil-container'>
                <h1>Meu Perfil</h1>
                
                <div className='profile-content'>
                    <div className='info-section'>
                        <h2>Informações Pessoais</h2>
                        <div className='info-item'>
                            <span className='info-label'>Nome Completo:</span>
                            <span className='info-value'>{medicoData.nome_completo}</span>
                        </div>
                        
                        <div className='info-item'>
                            <span className='info-label'>Data de Nascimento:</span>
                            <span className='info-value'>{formatarDataNascimento(medicoData.dataNascimento)}</span>
                        </div>
                        
                        <div className='info-item'>
                            <span className='info-label'>CPF:</span>
                            <span className='info-value'>{formatarCPF(medicoData.cpf)}</span>
                        </div>
                    </div>

                    <div className='info-section'>
                        <h2>Informações Profissionais</h2>
                        <div className='info-item'>
                            <span className='info-label'>CRM:</span>
                            <span className='info-value'>{medicoData.crm}</span>
                        </div>
                        
                        <div className='info-item'>
                            <span className='info-label'>Especialidade:</span>
                            <span className='info-value'>{medicoData.especialidade}</span>
                        </div>
                        
                        <div className='info-item'>
                            <span className='info-label'>Email Corporativo:</span>
                            <span className='info-value'>{medicoData.email_corporativo}</span>
                        </div>
                    </div>

                    <div className='info-section'>
                        <h2>Contato</h2>
                        <div className='info-item'>
                            <span className='info-label'>Telefone:</span>
                            <span className='info-value'>{formatarTelefone(medicoData.telefone)}</span>
                        </div>
                        
                        <div className='info-item'>
                            <span className='info-label'>Endereço:</span>
                            <span className='info-value'>{medicoData.endereco || 'Não informado'}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}