import React from 'react'
import './login.css'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'

export default function Login() {
    return (
        <>
        <Header/>
            <div className="background">
                <br />
                <form className='formularioLogin'>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="crm">CRM:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="crm"
                            placeholder="Informe o número da sua CRM" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">SENHA:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Informe a sua senha" />
                    </div>
                    <button type="submit" className="botaoEntrar">Entrar</button>
                </form>
            </div>
            <Footer />
        </>
    )
}
