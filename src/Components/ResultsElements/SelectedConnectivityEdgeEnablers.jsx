import React from 'react';
import { Col } from 'antd';

const SelectedConnectivityEdgeEnablers = ({ text }) => {
    return(
        <Col span={24} lg={8}>                          
            <div style={{ textAlign: '-webkit-center' }}>
                <div
                    style={{
                        width: '90%',
                        padding: '8px',
                        margin: '15px 0',
                        borderRadius: '9px',
                    }}
                >
                    <span style={{ margin: 'auto', fontSize: '18px' }}>{text}</span>                                  
                </div>
            </div>  
        </Col>  
    )
}

export default SelectedConnectivityEdgeEnablers;