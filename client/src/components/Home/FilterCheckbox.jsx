import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { grey } from '@mui/material/colors';
import '../../styles/Form.css';


const FilterCheckbox = ({
                            checkboxes,
                            handleCheckboxChange,
                            handleSelectAll,
                            selectAll
}) => (
    <div className="home-filter-container">
        <div className="home-filter-checkbox-container">
            <Checkbox
                onChange={handleSelectAll}
                checked={selectAll}
                sx={{
                    color: grey[600],
                    '&.Mui-checked': {
                        color: grey[400],
                    },
                }}
            />
            Select All
        </div>
        {Object.keys(checkboxes).map((key) => (
            <div
                className="home-filter-checkbox-container"
                key={key}
            >
                <Checkbox
                    name={key}
                    onChange={handleCheckboxChange}
                    checked={checkboxes[key]}
                    sx={{
                        color: grey[600],
                        '&.Mui-checked': {
                            color: grey[400],
                        },
                    }}
                />
                {(key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')).replaceAll("-", " ")}
            </div>
        ))}
    </div>
);


export default FilterCheckbox;