import React from 'react';
import { Col, Button } from 'antd';


const ConfirmButton = ({disabled, onClick}) => {
    return (
        <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
            <Button
                type="primary"
                disabled={disabled}
                onClick={onClick}
                style={{
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: '#FFF',
                    padding: '30px 20px',
                    fontSize: '18px',
                    fontWeight: 700,
                    borderRadius: '6px'
                }}
            >
                Confirm Selection
            </Button>      
        </Col>
    );
}

export default ConfirmButton;