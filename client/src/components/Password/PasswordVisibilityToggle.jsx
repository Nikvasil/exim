import React from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


const PasswordVisibilityToggle = ({
                                      showPassword, togglePasswordVisibility
                                  }) => (showPassword ? (<VisibilityOffOutlinedIcon
            sx={{fontSize: "3vh"}}
            className="password-visibility-icon"
            onClick={togglePasswordVisibility}
        />) : (<VisibilityOutlinedIcon
            sx={{fontSize: "3vh"}}
            className="password-visibility-icon"
            onClick={togglePasswordVisibility}
        />));


export default PasswordVisibilityToggle;