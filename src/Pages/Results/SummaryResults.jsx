import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Layout, Typography, Card } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { stepsLabels } from '../../Data/Data';
import SelectedSectorItem from '../../Components/ResultsElements/SelectedSectorItem';

const { Title } = Typography;

function SummaryResults() {
    const location = useLocation();
    const { solutionData } = location.state || {};  // Retrieve the data passed from the previous component
    const [sectorServiceData, setSectorServiceData] = useState(null);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState([]);
    const [filteredSolutionAnalysisData, setFilteredSolutionAnalysisData] = useState({});

    useEffect(() => {
        try {
            const storedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
            const storedSolutionAnalysisData = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));

            setSectorServiceData(storedSectorServiceData);
            setSolutionAnalysisData(storedSolutionAnalysisData);
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }, []);

    useEffect(() => {
        console.log('Solution data:', solutionData);
        console.log('Sector Service Data:', sectorServiceData);
        console.log('Solution Analysis data:', solutionAnalysisData);
        console.log('Filtered data:', filteredSolutionAnalysisData);

        const filteredData = solutionAnalysisData?.analysisResults?.find(item => item.id === solutionData?.Sol_ID.toString());
        setFilteredSolutionAnalysisData(filteredData);
    }, [solutionData, sectorServiceData, solutionAnalysisData, filteredSolutionAnalysisData]);

    return(
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                    <Col span={24}>
                        <TitleForm 
                            icon={stepsLabels[6].icon} 
                            subicon={stepsLabels[6].subicon} 
                            title={stepsLabels[6].title} 
                            subtitle={stepsLabels[6].subtitle}
                            level={2} 
                            color={'#158D6B'}
                        />
                    </Col>
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                    <Col span={24} lg={12} xxl={8}>
                        <Card hoverable bordered={false} className="selectedSectorsCard">
                            <Row>
                            <Col span={24}>
                                <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                    <div style={{ display: 'block', margin: 'auto' }}>
                                        Selected                      
                                    </div>                 
                                </Title> 
                            </Col>
                            </Row>
                            {sectorServiceData  && 
                                <Row span={24}>                             
                                    <SelectedSectorItem text={sectorServiceData.sector.result} />
                                    <SelectedSectorItem text={sectorServiceData.service.result} />
                                </Row>
                            }                           
                        </Card>      
                    </Col>
                    <Col span={24} lg={12} xxl={16}>
                        <Card hoverable bordered={false} className="selectedSectorsCard">
                            <Row>
                            <Col span={24}>
                                <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                    <div style={{ display: 'block', margin: 'auto' }}>
                                    Connectivity & Edge Enablers                      
                                    </div>                 
                                </Title> 
                            </Col>
                            </Row>
                            {sectorServiceData  && 
                                <Row span={24}>                             
                                    <SelectedSectorItem text={sectorServiceData.sector.result} />
                                    <SelectedSectorItem text={sectorServiceData.service.result} />
                                </Row>
                            }                           
                        </Card>           
                    </Col>
                   
                </Row>
            </Layout>
    )
}

export default SummaryResults;