import React from 'react';
import { Col, Row, Button, Avatar, List } from 'antd';
import { stepsLabels } from '../Data/Data';

function Home() {
    return (
        <>
            <Row gutter={[32, 24]} style={{ paddingTop: 50 }}>
                <Col span={24} className="wizard_steps_col">
                    <div className="wizard_steps_buttons" style={{ backgroundColor: '#FFF', borderRadius: '6px' }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={stepsLabels}
                            renderItem={(item, index) => (
                                <Button href={item.url} type="primary" icon={<Avatar src={item.icon} />} iconPosition={'start'} style={{ backgroundColor: '#00678A', margin: '20px 0px', display: 'block', width: '100%', height: 80 }} size='large' className="home_btns">
                                    {item.title}
                                </Button>
                            )}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Home;