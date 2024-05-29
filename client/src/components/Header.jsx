import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Header = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <header>
            <div className="header-left">
                <Link to="/">
                    <p> exim </p>
                </Link>
            </div>
            <div className="header-right">
                {!user ? (
                    <>
                        <Link to="/register">Sign Up</Link>
                        <Link to="/login">Sign In</Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    );
};


export default Header;

