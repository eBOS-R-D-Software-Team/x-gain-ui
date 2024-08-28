import React from 'react';
import { Col, Avatar, Typography } from 'antd';

const { Title } = Typography;

const TitleForm = ({icon, subicon, title, subtitle, level, color}) => {
    return (
        <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="titleFormCol" style={{ borderRadius: '6px' }}>
                <Title level={level} style={{ backgroundColor: color, padding: '16px', borderRadius: '10px', color: '#FFF', display: 'flex' }}>
                    <div>
                        <div>
                            <Avatar src={icon} style={{ marginRight: 10}} size={50}/>
                        </div>
                        {subicon &&
                            <div>
                                <Avatar src={subicon} style={{ marginRight: 10}} size={50}/>
                            </div>
                        }
                    </div>
                    <div style={{ display: 'block', margin: 'auto' }}>
                        {title}
                        {subtitle &&
                            <>
                                <br/>
                                {subtitle}
                            </>
                        }
                    </div>                 
                </Title>                
            </div>
        </Col>
    );
}

export default TitleForm;