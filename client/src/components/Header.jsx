import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import axios from 'axios';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [scrollUp, setScrollUp] = useState(true);
    const anchorRef = useRef(null);
    const lastScrollY = useRef(0);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleLogout = async () => {
        await setOpen(false);
        localStorage.removeItem('user');
        onLogout();
        navigate('/');
    };

    const handleChangePassword = () => {
        setOpen(false);
        navigate('/change-password');
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                await setOpen(false);
                await axios.delete(`/api/users/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                localStorage.removeItem('user');
                onLogout();
                navigate('/');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                setScrollUp(false);
            } else {
                setScrollUp(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={scrollUp ? 'show' : 'hide'}>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/" className="header-logo">exim</Link>
                </div>
                <div className="header-right">
                    {!user ? (
                        <div className="header-links">
                            <Link to="/register" className="header-button-contained">Sign Up</Link>
                            <Link to="/login" className="header-button-outlined">Log In</Link>
                        </div>
                    ) : (
                        <div className="header-account">
                            <Avatar
                                sx={{
                                    width: "5.4vh", // Adapt size based on viewport height
                                    height: "5.4vh", // Adapt size based on viewport height
                                    bgcolor: "#4D4D4D",
                                    fontFamily: "\"Linux Libertine G\", serif",
                                    fontSize: "3vh" // Adjust font size for consistency
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
                            <Popper
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                placement="bottom"
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom-end' }}
                                    >
                                        <Paper
                                            sx={{
                                                marginTop: "0.5vh",
                                                bgcolor: "#4D4D4D",
                                                color: "white"
                                            }}
                                        >
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList
                                                    autoFocusItem={open}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                    onKeyDown={handleListKeyDown}
                                                >
                                                    <div className="header-account-username">
                                                        Hi, {user.username}!
                                                    </div>
                                                    <div className="header-account-divider"/>
                                                    <MenuItem
                                                        sx={{
                                                            fontFamily: "\"Linux Libertine G\", serif",
                                                            borderRadius: "4px",
                                                            padding: "1.4vh",
                                                            margin: "0.5vh"
                                                        }}
                                                        onClick={handleChangePassword}
                                                    >
                                                        Change Password
                                                    </MenuItem>
                                                    <MenuItem
                                                        sx={{
                                                            fontFamily: "\"Linux Libertine G\", serif",
                                                            borderRadius: "4px",
                                                            padding: "1.4vh",
                                                            margin: "0.5vh"
                                                        }}
                                                        onClick={handleLogout}
                                                    >
                                                        Log Out
                                                    </MenuItem>
                                                    <MenuItem
                                                        className="header-menu-item"
                                                        sx={{
                                                            '&:hover': {bgcolor: "#A81700"},
                                                            borderRadius: "4px",
                                                            bgcolor: "#C91C00",
                                                            fontFamily: "\"Linux Libertine G\", serif",
                                                            padding: "1.4vh",
                                                            margin: "0.5vh",
                                                        }}
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;