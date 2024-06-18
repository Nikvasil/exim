import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import '../styles/Footer.css';


const Footer = () => {
    return (<footer>
            <div className="footer-container">
                <div className="footer-column">
                    <h3>Contact Info</h3>
                    <p>
                        <PlaceIcon
                            fontSize="small"
                            className="footer-icon"
                        />
                        Str. der Nationen 62, 09111 Chemnitz
                    </p>
                    <p>
                        <EmailOutlinedIcon
                            fontSize="small"
                            className="footer-icon"
                        />
                        mykyta.vasyliev@s2022.tu-chemnitz.de
                    </p>
                </div>
                <div className="footer-column">
                    <h3>Disclaimer</h3>
                    <p>This website does not belong to a real company. It is a university project.</p>
                </div>
            </div>
        </footer>);
};


export default Footer;