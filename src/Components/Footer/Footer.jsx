// Footer.js
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css'

export default function Footer() {
    return (
        <footer className='footerMedico'>
            <img
                src="../img/FooterLogo.png"
                alt="Logo do Hospital Saint-Michel"
                className='img-footeer'
            />

            <p>© 2025 Direitos reservados Hospital Saint-Michel by PNTEC-LTD</p>

            <div>
                <span>Parcerias estratégicas:</span>
                <strong>Libbs</strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Saúde e Inovação</span>
            </div>

            <div className="footer-social">
                <a
                    href="https://www.linkedin.com/in/saint-michael-hospital-47ab05359/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>

                <a
                    href="https://www.instagram.com/hospital.saintmichel/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
            </div>
        </footer>
    )
}