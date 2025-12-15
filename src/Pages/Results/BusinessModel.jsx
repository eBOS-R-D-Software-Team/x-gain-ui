import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Layout } from 'antd';
import { stepsLabels } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { businessModelData } from '../../Data/BusinessModelData';
import EndUserISPBusinessModel from './Components/EndUserISPBusinessModel';
import PublicAuthorityBusinessModel from './Components/PublicAuthorityBusinessModel';
import { PDFProvider } from '../../Context/PDF/PDFContext';
import BusinessModelPDF from '../../Components/PDFResults/BusinessModelPDF';

function BusinessModel() {
    const [sectorServiceLevelData, setSectorServiceLevelData] = useState({});
    const [sectorServiceData, setSectorServiceData] = useState({});
    const [data, setData] = useState(null);

    const businessModelRef = useRef(null);

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

    console.log(sectorServiceLevelData, sectorServiceData);

    useEffect(() => {
        if (sectorServiceData?.sector?.result && sectorServiceData?.service?.result && sectorServiceLevelData?.user_type_selection?.result) {
            let fetchBusinessData;

            if(sectorServiceData.sector.result.includes(',')) {
                const sectorsStringToArray = sectorServiceData.sector.result.split(",");
                console.log(true)

                fetchBusinessData = businessModelData.find(c => 
                    sectorsStringToArray.every(sector => c.sector.includes(sector)) && // Ensure `c.sector` is in the selected sectors
                    c.user_type === sectorServiceLevelData.user_type_selection.result
                );
            } else {
                console.log(false)

                fetchBusinessData = businessModelData.find(c => 
                    c.sector === sectorServiceData.sector.result &&
                    c.service === sectorServiceData.service.result &&
                    c.user_type === sectorServiceLevelData.user_type_selection.result
                );
            }

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
            <Row gutter={[32, 16]} style={{ margin: '10px', justifyContent: 'center' }}>
                <Col className="title_results_col" span={24}>
                    <TitleForm
                        icon={stepsLabels[11].icon}
                        subicon={stepsLabels[11].subicon}
                        title={stepsLabels[11].title}
                        subtitle={stepsLabels[11].subtitle}
                        level={2}
                        color={stepsLabels[11].color}
                    />
                    <PDFProvider>
                        <BusinessModelPDF 
                            businessModelRef={businessModelRef}
                        />
                    </PDFProvider>
                </Col>
            </Row>      
            {data ? (
                data.user_type === 'End-User' || data.user_type === 'Internet Service Provider (ISP)' ?
                    <div ref={businessModelRef}>
                        <EndUserISPBusinessModel data={data} />
                    </div>
                :
                    <div ref={businessModelRef}>
                        <PublicAuthorityBusinessModel data={data} />
                    </div>
            ) : (
                <div>No business model data found.</div> // Fallback message when data is null
            )}
        </Layout>
    );
}

export default BusinessModel;
