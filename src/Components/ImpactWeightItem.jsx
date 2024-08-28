import React from 'react';
import { Col, Slider, ConfigProvider } from 'antd';

const ImpactWeightItem = ({ title, value, onChange }) => {

    const marks = {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
    };

    return(
        <Col span={8} xs={24} lg={8}>
            <h1 style={{ fontWeight: 400 }}>{title}</h1>
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
                    defaultValue={3}
                    dots={false}
                    max={5}
                    min={1}
                    marks={marks}
                    value={value}
                    onChange={onChange}
                />
            </ConfigProvider>       
        </Col>
    )
}

export default ImpactWeightItem;