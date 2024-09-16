import React from 'react';
import { Card, Input } from 'antd';

const LocationInput = ({label, value, onChange, text}) => {
    return (
        <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1 , margin: "2% 0" }}>
            <div style={{ color: '#1D1D1D', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                {label}
            </div>
            <div style={{ textAlign: 'center' }}>
                <Input
                    defaultValue={value}
                    placeholder="Enter value"
                    onChange={onChange}
                    style={{ width: '100%', marginBottom: '8px'  }}
                    type="number" // Ensures only numbers are allowed
                    onKeyDown={(e) => {
                        if (e.key === ',' || e.key === 'e') {
                        // Prevents input of commas and scientific notation ('e' key)
                        e.preventDefault();
                        }
                    }}
                />
                <div style={{ color: '#1D1D1D', fontSize: '20px',fontWeight:'700' }}>{text}</div>
            </div>
        </Card>
    );
}

export default LocationInput;