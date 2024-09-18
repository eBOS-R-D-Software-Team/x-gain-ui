import React from 'react';
import { Card, Avatar } from 'antd';
import { renderBulletedList } from '../../HelperFunctions';

const BusinessModelCard = ({ type, title, content, icon, color }) => { 
    return (
        type === 'endUserISP' ? (
            <Card size='large' title={title} className="business_card" style={{ height: '100%', display: 'flex', flex: 1, flexDirection: 'column' }}> 
                <div style={{ flex: '1 1 auto' }}>    
                    <ul>
                        {renderBulletedList(content)}
                    </ul>
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Avatar src={icon} style={{ marginRight: '8px', width: 50, height: 50, borderRadius: 0 }} size={'large'} />
                </div>
            </Card>
        ) : (
            <Card size='large' title={title} style={{ height: '100%', border: `3px solid ${color}`, borderRadius: 40}}>
                <div> 
                    <ul>
                        {renderBulletedList(content)}
                    </ul>
                </div>
            </Card>
        )
    );
}

export default BusinessModelCard;
