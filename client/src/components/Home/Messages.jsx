import React from 'react';
import Alert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import '../../styles/Error.css';


const Messages = ({
                      error,
                      message
}) => (
    <>
        {error && (
            <div className="home-message">
                <Alert
                    variant="filled"
                    severity="error"
                >
                    {error}
                </Alert>
            </div>
        )}
        {message && (
            <div className="home-message">
                <Alert
                    icon={<CheckBoxOutlinedIcon
                        fontSize="inherit"
                        sx={{ color: grey[100] }}
                    />}
                    sx={{
                        color: grey[100],
                        borderRadius: '4px',
                        borderWidth: '0px',
                        borderColor: grey[900],
                        backgroundColor: grey[600],
                    }}
                    variant="outlined"
                    severity="success"
                >
                    {message}
                </Alert>
            </div>
        )}
    </>
);


export default Messages;