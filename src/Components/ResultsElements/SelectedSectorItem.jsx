import React from 'react';
import { Col } from 'antd';

const SelectedSectorItem = ({ text }) => {
    return(
        <Col span={12}>
            <div style={{ textAlign: '-webkit-center' }}>
                <div
                    style={{
                        width: '90%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        margin: '20px 0',
                        borderRadius: '9px',
                        backgroundColor: 'rgba(0, 103, 138, 0.89)',
                    }}
                >
                    <span style={{ color: "white", fontWeight: '700', margin: 'auto', fontSize: '18px' }}>{text}</span>                                  
                </div>
            </div>                         
        </Col>
    )
}

export default SelectedSectorItem;