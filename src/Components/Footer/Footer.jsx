import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css'

export default function Footer() {
    return (
        <>
            <footer>

                <div className='footerMedico'>

                    <img src="src/Img/FooterLogo.png" alt="Logo do Hospital Saint-Michel" className='img-footeer' />

                    <p>© 2025 Direitos reservados Hospital Saint-Michel by PNTEC-LTD</p>

                    <div>
                        <span>Parcerias:</span> <strong>Libbs</strong>
                    </div>

                    <div className="footer-social">
                        <FaLinkedin />
                        <FaFacebook />
                        <FaInstagram />
                    </div>

                </div>
            </footer>

        </>
    )
}
