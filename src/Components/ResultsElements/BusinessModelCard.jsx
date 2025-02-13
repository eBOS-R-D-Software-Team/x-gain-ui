import React from 'react';
import { Card, Avatar, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { renderBulletedList } from '../../Utils/ResultsUtils';
import { descriptionsBusinessModel } from '../../Data/Data';

const BusinessModelCard = ({ type, title, content, icon, color }) => { 
    const tooltipTitle = descriptionsBusinessModel[title]; // Lookup description for the title

    return (
        type === 'endUserISP' ? (
            <Card 
                size="large" 
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{title}</span>
                        {tooltipTitle && (
                            <Tooltip title={tooltipTitle}>
                                <InfoCircleOutlined 
                                    style={{ marginLeft: 10, fontSize: 18, color: "#00678A" }} 
                                />
                            </Tooltip>
                        )}
                    </div>
                }
                className="business_card" 
                style={{ height: '100%', display: 'flex', flex: 1, flexDirection: 'column' }}
            > 
                <div style={{ flex: '1 1 auto' }}>    
                    <ul>
                        {renderBulletedList(content)}
                    </ul>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Avatar 
                        src={icon} 
                        style={{ marginRight: '8px', width: 50, height: 50, borderRadius: 0 }} 
                        size="large" 
                    />
                </div>
            </Card>
        ) : (
            <Card 
                size="large" 
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span>{title}</span>
                        {tooltipTitle && (
                            <Tooltip title={tooltipTitle}>
                                <InfoCircleOutlined 
                                    style={{ marginLeft: 10, fontSize: 18, color: "#00678A" }} 
                                />
                            </Tooltip>
                        )}
                    </div>
                }
                style={{ height: '100%', border: `3px solid ${color}`, borderRadius: 40 }}
            >
                <div> 
                    <ul>
                        {renderBulletedList(content)}
                    </ul>
                </div>
            </Card>
        )
    );
};

export default BusinessModelCard;
