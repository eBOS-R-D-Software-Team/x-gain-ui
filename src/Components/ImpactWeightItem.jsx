import React from 'react';
import { Col, Slider, ConfigProvider ,Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';


const ImpactWeightItem = ({ title, value, onChange , tooltip }) => {

    const marks = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
    };

    return(
        <Col span={8} xs={24} lg={8}>
            <h1 style={{ fontWeight: 400 }}>
                <Tooltip title={tooltip} placement="top">
                    <span>{title}</span>
                    <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 20, color: "#00678A" }} />
                </Tooltip>
               
            </h1>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#1677ff', // Customize the primary color
                        controlHeight: 60,         // Customize the height of controls like Slider
                        colorPrimaryBorderHover: 'rgba(32,116,95,1)'
                    },
                    components: {
                        Slider: {
                            railSize: 34,
                            handleBackground: 'linear-gradient(90deg, rgba(32,116,95,1) 0%, rgba(81,170,147,1) 50%)',
                            handleActiveColor: 'rgba(32,116,95,1)',
                            handleActiveOutlineColor: 'rgba(32,116,95,1)',
                            handleColor: 'rgba(32,116,95,1)',
                            trackHoverBg: 'rgba(32,116,95,1)',
                            dotActiveBorderColor: 'rgba(32,116,95,1)',
                            handleLineWidthHover: 2,
                            handleSize: 10,
                            handleSizeHover: 10
                        },
                    },
                }}
            >
                <Slider 
                    defaultValue={2}
                    dots={false}
                    max={4}
                    min={0}
                    marks={marks}
                    value={value}
                    onChange={onChange}
                />
            </ConfigProvider>       
        </Col>
    )
}

export default ImpactWeightItem;