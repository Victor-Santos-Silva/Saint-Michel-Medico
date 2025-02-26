import React from 'react'
import './login.css'

export default function Login() {
    return (
        <>
      
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
                    <button type="submit" className="botaoEntrar"
                    Link to='/home'>Entrar</button>
                </form>
            </div>
            
        </>
    )
}
