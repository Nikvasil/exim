import React from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import '../../styles/Error.css';


const ErrorMessage = ({error}) => (error && (<p className="error-message">
            <ErrorOutlineOutlinedIcon className="error-outline-outlined-icon"/>
            {error}
        </p>));


export default ErrorMessage;