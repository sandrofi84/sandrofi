import React from 'react'

import githubIcon from '../images/icon-github.png'
import linkedinIcon from '../images/icon-linkedin.png'
import emailIcon from '../images/icon-email.png'

const Footer = () => {
    return (
        <footer className="footer bg--black-tr">
            <div className="footer-content">
                <a href="mailto:me@sandrofi.com" className="footer__link"><img src={emailIcon} alt="email" className="footer__icon footer__icon--email"/></a>
                <a href="https://github.com/sandrofi84" target="_blank" rel="noreferrer" className="footer__link"><img src={githubIcon} alt="github" className="footer__icon"/></a>
                <a href="https://www.linkedin.com/in/sandrofillinich/" target="_blank" rel="noreferrer" className="footer__link"><img src={linkedinIcon} alt="linkedin" className="footer__icon"/></a>
            </div>
        </footer>
    )
}

export default Footer
