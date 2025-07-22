// src/components/ClaimButton.jsx
import React from 'react';
import '../App.css';

const ClaimButton = ({ onClick, disabled }) => {
    return (
        <button
            className="claim-button"
            onClick={onClick}
            disabled={disabled}
        >
            Claim Points
        </button>
    );
};

export default ClaimButton;