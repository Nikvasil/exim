import React, { useEffect, useState } from 'react';
import '../styles/Disclaimer.css';

const Disclaimer = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const hasDismissed = localStorage.getItem('disclaimerDismissed');
        if (!hasDismissed) {
            setShowBanner(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('disclaimerDismissed', 'true');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="disclaimer-banner">
      <span>
        The web service was deployed on a free instance that spins down with inactivity,
        which can delay requests by 50 seconds or more.
      </span>
            <button
                className="close-btn"
                onClick={handleClose}
                title="Close">
                ✖
            </button>
        </div>
    );
};

export default Disclaimer;
