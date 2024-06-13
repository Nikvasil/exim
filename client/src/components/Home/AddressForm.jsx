import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TooltipComponent from '../Password/TooltipComponent';
import '../../styles/Form.css';


const AddressForm = ({
                         user,
                         isEditing,
                         homeAddress,
                         handleChange,
                         handleSubmit,
                         setIsEditing,
                         oldHomeAddress,
                         setOldHomeAddress,
                         setHomeAddress
}) => (!user ? (
            <div className="home-address-container">
                <div>
                <HomeOutlinedIcon
                    sx={{ fontSize: "3.2vh" }}
                    className="home-icon"
                />
                <Link
                    to="/register"
                    className="home-link">
                    Sign Up
                </Link> or <Link
                    to="/login"
                      className="home-link">
                    Log In
                </Link> to add your home address
                </div>
            </div>
        ) : (
            !user.homeAddress || isEditing ? (
                <div className="home-address-edit-container">
                    <div>
                    <HomeOutlinedIcon
                        sx={{ fontSize: "3.2vh" }}
                        className="home-icon"
                    />
                    Add your home address:
                        </div>
                    <div>
                    <input
                        className="home-address-input"
                        type="text"
                        name="homeAddress"
                        id="homeAddress"
                        placeholder="Mustermannstraße 1a"
                        value={homeAddress || oldHomeAddress}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="home-address-button"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                            className="home-address-button"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        X
                    </button>
                    <TooltipComponent
                        arrow
                        placement="right"
                        title="Make sure you have entered a real existing address."
                    >
                        <HelpOutlineIcon
                            sx={{ fontSize: "2.6vh" }}
                            className="home-tooltip"
                        />
                    </TooltipComponent>
                    </div>
                </div>
            ) : (
                <div className="home-address-container">
                    <div>
                    <HomeOutlinedIcon
                        sx={{ fontSize: "3.2vh" }}
                        className="home-icon"
                    />
                    Your home address is {user.homeAddress}
                    <button
                        type="button"
                        className="home-address-edit-button"
                        onClick={() => {
                            setOldHomeAddress(user.homeAddress);
                            setHomeAddress(user.homeAddress)
                            setIsEditing(!isEditing);
                        }}>
                        <EditOutlinedIcon sx={{ fontSize: "2.2vh" }} />
                    </button>
                    </div>
                </div>
            )
        )
);


export default AddressForm;