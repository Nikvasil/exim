import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import '../../styles/Header.css';
import HeaderMenu from './HeaderMenu';
import useScrollHandler from './useScrollHandler';


const Header = ({
                    user, onLogout, setIsLoading
                }) => {
    const [open, setOpen] = useState(false);
    const scrollUp = useScrollHandler();
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (<header className={scrollUp ? 'show' : 'hide'}>
            <div className="header-container">
                <div className="header-left">
                    <Link
                        to="/"
                        className="header-logo"
                    >
                        exim
                    </Link>
                </div>
                <div className="header-right">
                    {!user ? (<div className="header-links">
                            <Link
                                to="/register"
                                className="header-button-contained"
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                className="header-button-outlined"
                            >
                                Log In
                            </Link>
                        </div>) : (<div className="header-account">
                            <Avatar
                                sx={{
                                    width: "5.4vh",
                                    height: "5.4vh",
                                    bgcolor: "#4D4D4D",
                                    fontFamily: "\"Linux Libertine G\", serif",
                                    fontSize: "3vh"
                                }}
                                variant="rounded"
                                ref={anchorRef}
                                id="composition-button"
                                aria-controls={open ? 'composition-menu' : undefined}
                                aria-expanded={open ? 'true' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                {user.username[0]}
                            </Avatar>
                            <HeaderMenu
                                user={user}
                                open={open}
                                handleClose={handleClose}
                                handleListKeyDown={handleListKeyDown}
                                anchorRef={anchorRef}
                                setOpen={setOpen}
                                onLogout={onLogout}
                            />
                        </div>)}
                </div>
            </div>
        </header>);
};


export default Header;