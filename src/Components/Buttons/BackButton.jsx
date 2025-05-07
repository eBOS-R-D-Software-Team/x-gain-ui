import React, { useEffect, useState } from 'react';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useBackButton } from '../../Context/BackButtonContext';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ currentLocationPage }) => {
    
    const { backAction, defaultBackAction } = useBackButton(); // Get the back action from context
    const navigate = useNavigate();
    const [selectedLevel, setSelectedLevel] = useState('');

    useEffect(() => {
        const storedDetails = localStorage.getItem('sectorsServicesLevelDetails');
        if (storedDetails) {
            try {
                const parsedDetails = JSON.parse(storedDetails);
                const level = parsedDetails?.level_of_assessment?.result || '';
                setSelectedLevel(level);
            } catch (error) {
                console.error('Failed to parse sectorsServicesLevelDetails:', error);
            }
        } else {
            console.warn('No sectorsServicesLevelDetails found in localStorage');
        }
    }, []);

    const handleBackClick = () => {    
        if (currentLocationPage === '/sector-services-level' && selectedLevel === 'Regional' ) {   
            navigate('/home'); 
        }
        else if (currentLocationPage === '/questions') {
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
        <button 
            className='backbuttonMargin'
            onClick={handleBackClick}
            style={{                    
                borderRadius: '7px',
                background: '#00678A',
                color: 'white',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px',
                cursor: 'pointer'
            }}
        >
            <LeftCircleOutlined />
            <span className='headerBtnText' style={{ paddingTop: '10%' , paddingRight: '2%' }}>Back</span>
        </button>
    );
};

export default BackButton;
