import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/eximLogo.png';
import Avatar from '@mui/material/Avatar';


const Header = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header>
            <div className="header-container">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="Exim Logo" className="header-logo"/>
                </Link>
            </div>
            <div className="header-right">
                {!user ? (
                    <div className="header-links">
                        <Link to="/register" className="button contained">Sign Up</Link>
                        <Link to="/login" className="button outlined">Log In</Link>
                    </div>
                ) : (
                    <div className="header-account">
                            <Avatar sx={{ bgcolor: "dimgray" }} variant="rounded" onClick={handleLogout}>{user.username[0]}</Avatar>
                    </div>
                )}
            </div>
            </div>
        </header>
    );
};


export default Header;

