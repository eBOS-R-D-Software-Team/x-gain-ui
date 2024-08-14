import React from 'react';
import { Col, Card, Checkbox } from 'antd';

const LocationCheckbox = ({label, text, data, checkedItems, onChange}) => {
    return (
        <Col span={9} xs={24} md={9}>
            <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1 }}>
                <div style={{ color: '#1D1D1D', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                    {label}
                </div>
                <div style={{color: "#00678A", fontSize: "18px", fontWeight: "600", marginBottom: "40px"}}>
                    {text}
                </div>
                <div>
                    {data.map((item, index) => (
                        <Checkbox
                            key={item.id}
                            checked={checkedItems[index] === 1}
                            onChange={() => onChange(index)}
                            disabled={!item.isActive}
                            style={{ display: 'flex', textAlign: 'start', paddingBottom: 20 }}
                        >
                            {item.text}
                        </Checkbox>
                    ))}  
                </div> 
            </Card>               
        </Col>
    );
}

export default LocationCheckbox;