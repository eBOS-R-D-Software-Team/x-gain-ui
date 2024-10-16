// BackButton.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd'; 
import { LeftCircleOutlined } from '@ant-design/icons';
import { useBackButton } from '../../Context/BackButtonContext';

const BackButton = ({ currentLocationPage }) => {
    const navigate = useNavigate();
    const { backAction, defaultBackAction } = useBackButton(); // Get the back action from context
    const handleBackClick = () => {        
        if (currentLocationPage === '/questions') {
            // Call the backAction
            backAction();        
        }
        else if (currentLocationPage === '/social-questions'){           
            backAction();
        }
        else {
            // Default behavior: navigate back
            console.log('Executing default back action');
            defaultBackAction(); // This should handle default navigation logic
        }        
    };

    return (
        <Tooltip title="Back">
            <button 
                onClick={handleBackClick}
                style={{ marginLeft: '30px', width: '40px', height: '40px', borderRadius: '7px', background: '#00678A', color: 'white', border: 'none', textDecoration: 'underline' }}
            >
                <LeftCircleOutlined style={{ fontSize: '24px' }} />
            </button>
        </Tooltip>
    );
};

export default BackButton;
