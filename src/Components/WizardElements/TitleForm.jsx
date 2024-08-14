import React from 'react';
import { Col, Avatar, Typography } from 'antd';

const { Title } = Typography;

const TitleForm = ({avatar, text}) => {
    return (
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ borderRadius: '6px', width: '60%' }}>
                <Title level={2} style={{ backgroundColor: '#00678A', padding: '16px', borderRadius: '10px', color: '#FFF' }}>
                    <Avatar src={avatar} style={{ marginRight: 10}} size={'large'}/>
                    {text}
                </Title>                
            </div>
        </Col>
    );
}

export default TitleForm;