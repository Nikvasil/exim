import React from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))`
    & .MuiTooltip-tooltip {
        font-size: 2.2vh;
        font-family: "Linux Libertine G", serif;
        text-align: justify;
        padding: 1.6vh;
        font-weight: lighter;
        background-color: #333333;
        border: white 1px solid;
        border-radius: 4px;
    }
`;

const TooltipComponent = ({ title }) => (
    <StyledTooltip arrow placement="right-start" title={title}>
        <HelpOutlineIcon sx={{ fontSize: "2.6vh" }} className="password-tooltip" />
    </StyledTooltip>
);


export default TooltipComponent;