import React, { useState, useEffect } from 'react';
import { Row, Col, Layout, Typography, Card, Space, Avatar } from 'antd';
import { stepsLabels } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { businessModelData } from '../../Data/BusinessModelData';
import EndUserISPBusinessModel from './Components/EndUserISPBusinessModel';
import PublicAuthorityBusinessModel from './Components/PublicAuthorityBusinessModel';

const { Title } = Typography;

function BusinessModel() {
    const [sectorServiceLevelData, setSectorServiceLevelData] = useState({});
    const [sectorServiceData, setSectorServiceData] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        const sectorServiceData = localStorage.getItem('sectorsServicesDetails');
        if (sectorServiceData) {
            setSectorServiceData(JSON.parse(sectorServiceData));
        }

        const sectorServiceLevelData = localStorage.getItem('sectorsServicesLevelDetails');
        if (sectorServiceLevelData) {
            setSectorServiceLevelData(JSON.parse(sectorServiceLevelData));
        }
    }, []);

    useEffect(() => {
        if (sectorServiceData?.sector?.result && sectorServiceData?.service?.result && sectorServiceLevelData?.user_type_selection?.result) {
            const fetchBusinessData = businessModelData.find(c => 
                c.sector === sectorServiceData.sector.result &&
                c.service === sectorServiceData.service.result &&
                c.user_type === sectorServiceLevelData.user_type_selection.result
            );

            if (fetchBusinessData) {
                setData(fetchBusinessData);
            } else {
                setData(null); // Clear data if not found
            }
        }
    }, [sectorServiceData, sectorServiceLevelData]);

    console.log(data);

    return (
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px' }}>
                <Col span={24}>
                    <TitleForm
                        icon={stepsLabels[10].icon}
                        subicon={stepsLabels[10].subicon}
                        title={stepsLabels[10].title}
                        subtitle={stepsLabels[10].subtitle}
                        level={2}
                        color={stepsLabels[10].color}
                    />
                </Col>
            </Row>      
            {data.user_type === 'End-User' || data.user_type === 'Internet Service Provider (ISP)' ?
                <EndUserISPBusinessModel data={data} />
            :
                <PublicAuthorityBusinessModel data={data} />
            }    
        </Layout>
    );
}

export default BusinessModel;