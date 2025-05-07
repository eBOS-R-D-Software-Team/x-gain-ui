import React from 'react';
import { Avatar, Typography } from 'antd';

const { Title } = Typography;

const SubtitleForm = ({avatar, text}) => {
    return (
        <div style={{ borderRadius: '6px', display: 'flex', justifyContent: 'center' }}>
            <Title level={3} className='subtitleLabels' style={{ backgroundColor: '#008D6B', padding: '10px', borderRadius: '10px', color: '#FFF', width: '90%' }}>
                <Avatar src={avatar} style={{ marginRight: 10, borderRadius: 0 }} size={'large'}/>
                {text}
            </Title>                
        </div>
    );
}

export default SubtitleForm;