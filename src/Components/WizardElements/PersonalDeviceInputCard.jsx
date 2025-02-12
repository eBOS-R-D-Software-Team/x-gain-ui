import React from 'react';
import { Col, Row, Card, Input } from 'antd';

const PersonalDeviceInputCard = ({ deviceType, label, value, onChange }) => {
    return (
        <Col span={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card size="small" style={{ background: "rgba(0, 44, 60, 0.10)", textAlign: 'center', marginTop: 20, padding: '30px 0' }}>                    
                <Row>
                    <Col span={24}>
                        <label style={{color: "#00678A", fontSize: "20px", fontWeight: "700"}}>{label}</label>
                        <Input
                            type="text"
                            name={`${deviceType}Input`}
                            value={value}
                            onChange={(e) => onChange(e, deviceType)}
                            disabled={false}
                            style={{ width: "100%", margin: "20px 0" }}
                        />
                    </Col>
                </Row>    
            </Card>
        </Col>
    );
};

export default PersonalDeviceInputCard;
