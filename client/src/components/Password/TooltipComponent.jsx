import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useMediaQuery from '@mui/material/useMediaQuery';


const StyledTooltip = styled(({className, ...props}) => (<Tooltip
        {...props}
        classes={{popper: className}}
    />))`
    & .MuiTooltip-tooltip {
        font-size: 2.2vh;
        font-family: "Linux Libertine G", serif;
        text-align: justify;
        padding: 1.6vh;
        font-weight: lighter;
        background-color: #333333;
        border: white 1px solid;
        border-radius: 4px;

        @media (max-width: 840px) {
            max-width: 100%;
        }
    }
`;

const TooltipComponent = ({title}) => {
    const isMobile = useMediaQuery('(max-width:840px)');
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (<StyledTooltip
            arrow
            placement={isMobile ? 'top-end' : 'right-start'}
            title={title}
            open={open}
            disableFocusListener={isMobile}
            disableHoverListener={isMobile}
            disableTouchListener={isMobile}
        >
            <HelpOutlineIcon
                sx={{fontSize: "2.6vh"}}
                className="password-tooltip"
                onClick={handleClick}
            />
        </StyledTooltip>);
};


export default TooltipComponent;