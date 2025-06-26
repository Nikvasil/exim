import React, { useState } from "react";
import '../styles/Disclaimer.css';

const Disclaimer = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="disclaimer-banner">
      <span>
        The web service was deployed on a free instance that spins down with inactivity,
        which can delay requests by 50 seconds or more.
      </span>
            <button className="close-btn" onClick={() => setVisible(false)} title="Close">
                ✖
            </button>
        </div>
    );
};

export default Disclaimer;
