import React from 'react';
import { Card, Input } from 'antd';

const LocationInput = ({inputName, label, value, onChange, text}) => {

    const onKeyDown = (e) => {
        if ((inputName === 'Area' && (e.key === ',')) || (inputName === 'Vegetation Height' && (e.key === ',' || e.key === '.'))) {
            // Prevents input of commas and scientific notation ('e' key)
            e.preventDefault();
        }
    }
    
    return (
        <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1 , margin: "2% 0" }}>
            <div style={{ color: '#1D1D1D', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                {label}
            </div>
            <div style={{ textAlign: 'center' }}>
                <Input
                    value={value}
                    placeholder="Enter value"
                    onChange={onChange}
                    style={{ width: '100%', marginBottom: '8px'  }}
                    type="number" // Ensures only numbers are allowed                 
                    onKeyDown={onKeyDown}
                />
                <div style={{ color: '#1D1D1D', fontSize: '20px',fontWeight:'700' }}>{text}</div>
            </div>
        </Card>
    );
}

export default LocationInput;