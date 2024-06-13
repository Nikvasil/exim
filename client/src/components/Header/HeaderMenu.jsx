import React from 'react';
import { MenuItem, MenuList, ClickAwayListener, Grow, Paper, Popper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {deleteUser} from "../../api/userApi.js";


const HeaderMenu = ({
                        user,
                        open,
                        handleClose,
                        handleListKeyDown,
                        anchorRef,
                        setOpen,
                        onLogout
}) => {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        setOpen(false);
        navigate('/change-password');
    };

    const handleLogout = async () => {
        await setOpen(false);
        localStorage.removeItem('user');
        onLogout();
        navigate('/');
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                await setOpen(false);
                await deleteUser(user);
                localStorage.removeItem('user');
                onLogout();
                navigate('/');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom"
            transition disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom-end' }}
                >
                    <Paper sx={{
                        marginTop: '0.5vh',
                        bgcolor: '#4D4D4D',
                        color: 'white'
                    }}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open}
                                      id="composition-menu"
                                      aria-labelledby="composition-button"
                                      onKeyDown={handleListKeyDown}
                            >
                                <div className="header-account-username">Hi, {user.username}!</div>
                                <div className="header-account-divider" />
                                <MenuItem
                                    sx={{
                                    fontFamily: '"Linux Libertine G", serif',
                                    borderRadius: '4px',
                                    padding: '1.4vh',
                                    margin: '0.5vh' }}
                                          onClick={handleChangePassword}
                                >
                                    Change Password
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        fontFamily: '"Linux Libertine G", serif',
                                        borderRadius: '4px',
                                        padding: '1.4vh',
                                        margin: '0.5vh' }}
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </MenuItem>
                                <MenuItem
                                    className="header-menu-item"
                                    sx={{
                                        '&:hover': { bgcolor: '#A81700' },
                                        borderRadius: '4px',
                                        bgcolor: '#C91C00',
                                        fontFamily: '"Linux Libertine G", serif',
                                        padding: '1.4vh', marginTop: '0.5vh',
                                        marginLeft: '0.5vh',
                                        marginRight: '0.5vh' }}
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
    );
};


export default HeaderMenu;
