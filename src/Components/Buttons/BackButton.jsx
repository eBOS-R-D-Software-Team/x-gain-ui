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
                className='backbuttonMargin'
                onClick={handleBackClick}
                style={{                    
                    width: '60px',
                    height: '60px',
                    borderRadius: '7px',
                    background: '#00678A',
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                  }}
            >
                <LeftCircleOutlined style={{ fontSize: '24px' }} />
                <span style={{ fontSize: '12px' , paddingTop: '10%' , paddingRight: '2%' }}>Back</span>
            </button>
        </Tooltip>
    );
};

export default BackButton;
