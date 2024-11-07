import React from 'react';
import { Button } from 'antd';


const ConfirmButton = ({disabled, onClick, text, color}) => {
    return (
        <Button
            type="primary"
            disabled={disabled}
            onClick={onClick}
            style={{
                backgroundColor: color,
                borderColor: color,
                color: '#FFF',
                padding: '30px 20px',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: '6px'
            }}
        >
            {text}
        </Button>      
    );
}

export default ConfirmButton;