import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Typography, Card, Spin } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { stepsLabels } from '../../Data/Data';
import SelectedSectorItem from '../../Components/ResultsElements/SelectedSectorItem';
import SelectedConnectivityEdgeEnablers from '../../Components/ResultsElements/SelectedConnectivityEdgeEnablers';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { processPieChartData } from '../../HelperFunctions';

const { Title } = Typography;

function SummaryResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const { solutionData } = location.state || {};  // Retrieve the data passed from the previous component
    const [sectorServiceData, setSectorServiceData] = useState(null);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState([]);
    const [filteredSolutionAnalysisData, setFilteredSolutionAnalysisData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
            const storedSolutionAnalysisData = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));

            if (storedSectorServiceData) {
                setSectorServiceData(storedSectorServiceData);
            }
            if (storedSolutionAnalysisData) {
                setSolutionAnalysisData(storedSolutionAnalysisData);
            }
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }, []);


    useEffect(() => {
        console.log('Solution data:', solutionData.Processing_information.Process_Dev_per_layer[0]);
        console.log('Sector Service Data:', sectorServiceData);
        console.log('Solution Analysis data:', solutionAnalysisData);

        const filteredData = solutionAnalysisData.analysisResults?.find(item => item.id === solutionData?.Sol_ID.toString());
        if (filteredData) {
            setFilteredSolutionAnalysisData(filteredData);
        }
        localStorage.setItem('filteredSolutionAnalysisDataBySol', JSON.stringify(filteredSolutionAnalysisData));

        console.log('Filtered data:', filteredSolutionAnalysisData);

    }, [solutionData, sectorServiceData, solutionAnalysisData, filteredSolutionAnalysisData]);

 
    useEffect(() => {
        if (filteredSolutionAnalysisData) {
            if (filteredSolutionAnalysisData.capexPerLayer) {
                const capexChartData = processPieChartData(filteredSolutionAnalysisData.capexPerLayer);
                setCapexCategoryData(capexChartData);
            }
    
            if (filteredSolutionAnalysisData.opexPerCategory) {
                const opexChartData = processPieChartData(filteredSolutionAnalysisData.opexPerCategory);
                setOpexCategoryData(opexChartData);
            }
        }
        setLoading(false);
    }, [filteredSolutionAnalysisData]);


    const handleCardClick = () => {
        setLoading(true);
        localStorage.setItem('filteredSolutionAnalysisDataBySol', JSON.stringify(filteredSolutionAnalysisData));

        setTimeout(() => {
            navigate('/techno-economic-indicators');
        }, 1000);
    };


    return(
        <Spin spinning={loading} tip="Loading...">
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
                            {sectorServiceData && 
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
                            {sectorServiceData && 
                                <Row span={24}>  
                                    {solutionData.Processing_information.Process_Dev_per_layer[0].length !== 0 ??
                                        <SelectedConnectivityEdgeEnablers text={solutionData.Processing_information.Process_Dev_per_layer[0]}/>
                                    }
                                    {solutionData.Processing_information.Process_Dev_per_layer[1].length !== 0 &&
                                        <SelectedConnectivityEdgeEnablers text={solutionData.Processing_information.Process_Dev_per_layer[1]}/>
                                    }
                                    {solutionData.End_dev_information.Number[0].length !== 0 &&
                                        <SelectedConnectivityEdgeEnablers text={solutionData.End_dev_information.Number[0] + 'x ' + solutionData.End_dev_information.Type[0]}/>
                                    }
                                </Row>
                            }                           
                        </Card>           
                    </Col>              
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                    <Col span={24} lg={12} xxl={8}>                   
                        <Card hoverable bordered={false} className="selectedSectorsCard" onClick={handleCardClick}>
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <div style={{ display: 'block', margin: 'auto' }}>
                                            Techno-economic indicators                      
                                        </div>                 
                                    </Title> 
                                </Col>
                            </Row>
                            {filteredSolutionAnalysisData && 
                                <Row span={24}>    
                                    <Col span={24} style={{ marginTop: 20 }}>              
                                        <PieChartData title={'CAPEX Breakdown'} data={capexCategoryData} />
                                    </Col>
                                    <Col span={24} style={{ marginTop: 20 }}>              
                                        <PieChartData title={'OPEX Breakdown'} data={opexCategoryData} />
                                    </Col>
                                </Row>
                            }  
                        </Card>   
                    </Col>                               
                </Row>
            </Layout>
        </Spin>
    )
}

export default SummaryResults;