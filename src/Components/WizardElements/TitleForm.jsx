import React from 'react';
import { Col, Avatar, Typography , Tooltip} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const TitleForm = ({icon, subicon, title, subtitle, level, color ,tooltips }) => {
    const location = useLocation();
    const pathname = String(location.pathname || ""); // Ensure it's a string

    const isHiddenPath = pathname.match(/\/solution\/[^/]+\/summary-results|\/home|\/social-questions|\/techno-economic-indicators|\/socio-environmental-indicators|\/business-model/);
    
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
            { !isHiddenPath  && (
                <Tooltip title={tooltips}>
                    <InfoCircleOutlined style={{ marginLeft: 120, fontSize: 40, color: "#00678A" }} />
                </Tooltip>
            )}
        </Col>
   
    );
}

export default TitleForm;