import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Typography, Card, Spin, Button , Tooltip, FloatButton } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { stepsLabels , tooltips } from '../../Data/Data';
import SelectedSectorItem from '../../Components/ResultsElements/SelectedSectorItem';
import SelectedConnectivityEdgeEnablers from '../../Components/ResultsElements/SelectedConnectivityEdgeEnablers';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { processPieChartData, getConnectivityProcessingEnablers } from '../../Utils/ResultsUtils';
import RadarChartData from '../../Components/ResultsElements/RadarChartData';
import { InfoCircleOutlined, QuestionCircleOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

const { Title } = Typography;

function SummaryResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const { solutionData } = location.state || {};  // Retrieve the data passed from the previous component
    const [sectorServiceData, setSectorServiceData] = useState(null);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState([]);
    const [socialScoresData, setSocialScoresData] = useState([]);
    const [environmentalData, setEnvironmentalData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [filteredSolutionAnalysisData, setFilteredSolutionAnalysisData] = useState({});
    const [filteredSolarAnalysisData, setFilteredSolarAnalysisData] = useState({});
    const [filteredEnvironmentalData, setFilteredEnvironmentalData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);
    const [carboonFootprintData, setCarboonFootprintData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            const storedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
            const storedSolutionAnalysisData = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));
            const socialAnswersScores = JSON.parse(localStorage.getItem('socialAnswersResponse'));
            const environmentalAnalysisData = JSON.parse(localStorage.getItem('environmentalDataResponse'));

            if (storedSectorServiceData) {
                setSectorServiceData(storedSectorServiceData);
            }
            if (storedSolutionAnalysisData) {
                setSolutionAnalysisData(storedSolutionAnalysisData);
            }
            if (socialAnswersScores) {
                setSocialScoresData(socialAnswersScores);
            }
            if (environmentalAnalysisData) {
                setEnvironmentalData(environmentalAnalysisData);
            }
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }, []);


    useEffect(() => {
        console.log('Solution Analysis data:', solutionAnalysisData);

        const filteredData = solutionAnalysisData.analysisResults?.find(item => item.id === solutionData?.Sol_ID.toString());
        const filteredSolarData = solutionAnalysisData.analysisResults?.find(item =>
            item.id.startsWith(`${solutionData?.Sol_ID}.`)
        );        
        
        if (filteredData && filteredData !== filteredSolutionAnalysisData) {
            setFilteredSolutionAnalysisData(filteredData);
            setFilteredSolarAnalysisData(filteredSolarData);
        }
        console.log('Filtered Solution data:', filteredSolutionAnalysisData);
        console.log('Filtered Solar data:', filteredSolarAnalysisData);
    }, [solutionData, solutionAnalysisData, filteredSolutionAnalysisData, filteredSolarAnalysisData]);


    useEffect(() => {
        const filteredData = environmentalData?.find(item => item.solution === solutionData?.Sol_ID);
        if (filteredData && filteredData !== filteredEnvironmentalData) {
            setFilteredEnvironmentalData(filteredData);
        }
    }, [solutionData, environmentalData, filteredEnvironmentalData]);

 
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

    
    useEffect(() => {
        if (socialScoresData.length > 0) {
            const labels = socialScoresData.map(item => `${item.category} ⓘ`);
            const scores = socialScoresData.map(item => item.score);
            const tooltips = socialScoresData.map(item => {
                const general = item.generalToolTip || '';
                const country = item.countryToolTip || '';
                return general && country ? `${general}\n\n${country}` : general || country || '';
            });

            const chart = {
                labels,
                datasets: [
                    {
                        label: 'Scores (hover your mouse on the scores to see more details)',
                        data: scores,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        tooltips
                    },
                ],
            };

            setChartData(chart);
            setLoading(false); // stop loading spinner
        }
    }, [socialScoresData]);

    
    // END DEVICES (1ST COLUMN)
    const endDevicesLength = solutionData.End_dev_information.Type.length;
    const endDevicesData = solutionData.End_dev_information.Type.slice(0, endDevicesLength).map((device, index) => {
        if (!device || !solutionData.End_dev_information.Number[index]) {
            return null;  // Return null if either is missing
        }
      
        return `${solutionData.End_dev_information.Number[index]}x ${device}`;
    }).filter(item => item !== null);


    // NETS (2ND COLUMN)
    const flattenArray = (arr) => {
        return arr.flatMap(item => Array.isArray(item) ? item : [item]);
    };
    
    const numbers = flattenArray(solutionData.Connectivity_information.Number);

    let netsUserWithInternet = solutionData.Connectivity_information.Nets_User; // Keep all items
    let netsUserWithoutInternet = netsUserWithInternet.slice(0, -1); // Without the last item

    let netsWithInternet = flattenArray(netsUserWithInternet);
    let netsWithoutInternet = flattenArray(netsUserWithoutInternet);

    const netsDataWithInternet = getConnectivityProcessingEnablers(netsWithInternet, numbers);
    const netsDataWithoutInternet = getConnectivityProcessingEnablers(netsWithoutInternet, numbers);

    const netsData = netsDataWithInternet.length === 1 ? netsDataWithInternet : netsDataWithoutInternet;
    

    // PROCESSING (3RD COLUMN)
    const processingNumbers = flattenArray(solutionData.Processing_information.Number);
    const processingEnablers = flattenArray(solutionData.Processing_information.Process_Dev_per_layer_User);

    const enablersData = getConnectivityProcessingEnablers(processingEnablers, processingNumbers);
    

    useEffect(() => {     
        const data = [
            ["Category", "Value"],
            [netsData.join(', '), parseFloat(filteredEnvironmentalData.cO2FPrNetw)],
            [enablersData.join(', '), parseFloat(filteredEnvironmentalData.cO2FPrEnabl)],
            [endDevicesData.join(', '), parseFloat(filteredEnvironmentalData.cO2FPrEUD)],
        ];    

        setCarboonFootprintData(data); // Update the state with the fetched data  
    }, [filteredEnvironmentalData, solutionData, netsData, endDevicesData, enablersData]);


    const handleTechnoEconomicCardClick = () => {
        setLoading(true);
        localStorage.setItem('filteredSolutionAnalysisDataBySol', JSON.stringify(filteredSolutionAnalysisData));
        localStorage.setItem('filteredSolarAnalysisDataBySol', JSON.stringify(filteredSolarAnalysisData));
        localStorage.setItem('solData', JSON.stringify(solutionData));
        console.log(solutionData);

        setTimeout(() => {
            navigate('/techno-economic-indicators');
        }, 1000);
    };


    const handleSocioEnvironmentalCardClick = () => {
        setLoading(true);
        localStorage.setItem('filteredEnvironmentalDataBySol', JSON.stringify(filteredEnvironmentalData));
        localStorage.setItem('socialRadarData', JSON.stringify(chartData));
        localStorage.setItem('connectivityEdgeEnablers', JSON.stringify([netsData, enablersData, solutionData, endDevicesData]));
        console.log(solutionData);
        setTimeout(() => {
            navigate('/socio-environmental-indicators');
        }, 1000);
    };


    const handleBusinessModelClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/business-model');
        }, 1000);
    };
        

    return(
        <Spin spinning={loading} tip="Loading...">
            <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]} style={{ margin: '10px', justifyContent: 'center' }}>
                    <Col className="title_results_col" span={24}>
                        <div className="title-and-buttons">
                            <TitleForm 
                                icon={stepsLabels[7].icon} 
                                subicon={stepsLabels[7].subicon} 
                                title={stepsLabels[7].title} 
                                subtitle={stepsLabels[7].subtitle}
                                level={2} 
                                color={stepsLabels[7].color}
                            />
                            <div className="download-buttons-container">
                                <a 
                                    href="/documents/guide_to_local_broadband_deployment.pdf"
                                    target="_blank"
                                    className="download-btn"
                                >
                                    <DeploymentUnitOutlined className="download-btn-icon" />
                                    <span>Deployment Guide</span>
                                </a>

                                <a 
                                    href="/documents/technological_handbook.pdf"
                                    target="_blank"
                                    className="download-btn"
                                >
                                    <DeploymentUnitOutlined className="download-btn-icon" />
                                    <span>Technological Handbook</span>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '10px'}}>
                    <Col span={24} lg={12} xxl={8}>
                        <Card hoverable className="selectedSectorsCard">
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <Tooltip title={tooltips.Selected.description}>
                                            <div style={{ display: 'block', margin: 'auto' }}>
                                                Selected   <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />                      
                                            </div>                    
                                        </Tooltip>             
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
                        <Card hoverable className="selectedSectorsCard">
                            <Row>
                            <Col span={24}>
                                <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                    <Tooltip title={tooltips.Connectivity_And_Edge_Solutions.description}>
                                        <div style={{ display: 'block', margin: 'auto' }}>
                                            Connectivity & Processing Enablers   <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />                    
                                        </div> 
                                    </Tooltip>                    
                                </Title> 
                            </Col>
                            </Row>
                            {sectorServiceData && 
                                <Row span={24}>   
                                    <SelectedConnectivityEdgeEnablers text={endDevicesData.join(', ')}/>                             
                                    <SelectedConnectivityEdgeEnablers text={netsDataWithInternet.join(', ')}/>
                                    <SelectedConnectivityEdgeEnablers text={enablersData.join(', ')}/>
                                </Row>
                            }                           
                        </Card>           
                    </Col>              
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '10px'}}>
                    <Col span={24} lg={12}>                   
                        <Card hoverable className="selectedSectorsCard" style={{ position: 'relative' }} onClick={handleTechnoEconomicCardClick} 
                            onTouchStart={(e) => {
                                e.currentTarget.startY = e.touches[0].clientY; // Store the initial Y position
                                }}
                                onTouchEnd={(e) => {
                                const endY = e.changedTouches[0].clientY;
                                const distance = Math.abs(endY - e.currentTarget.startY);

                                // If the finger didn't move more than 10px, it's considered a tap
                                if (distance < 10) {
                                    handleTechnoEconomicCardClick();
                                }
                            }}
                        >
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <Tooltip title={tooltips.Techno_Economic_Indicators.description}>
                                            <div style={{ display: 'block', margin: 'auto' }}>
                                                Techno-Economic Indicators   <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />                                        
                                            </div>      
                                        </Tooltip>              
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
                        <Card hoverable className="selectedSectorsCard" style={{ marginTop: '20px', position: 'relative'}} onClick={handleBusinessModelClick}
                            onTouchStart={(e) => {
                                e.currentTarget.startY = e.touches[0].clientY; // Store the initial Y position
                                }}
                                onTouchEnd={(e) => {
                                const endY = e.changedTouches[0].clientY;
                                const distance = Math.abs(endY - e.currentTarget.startY);

                                // If the finger didn't move more than 10px, it's considered a tap
                                if (distance < 10) {
                                    handleBusinessModelClick();
                                }
                            }}
                        >
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <Tooltip title={tooltips.Business_Model.description}>
                                            <div style={{ display: 'block', margin: 'auto' }}>
                                                Business Model <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />
                                            </div>    
                                        </Tooltip>               
                                    </Title> 
                                </Col>
                            </Row>                           
                            <Row span={24}>    
                                <Col span={24} style={{ height: 350, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div 
                                        style={{ 
                                            position: 'absolute', 
                                            top: 0, 
                                            left: 0, 
                                            right: 0, 
                                            bottom: 0, 
                                            backgroundImage: `url('/images/business-model-icons/bm-main-img.png')`, 
                                            backgroundRepeat: 'no-repeat', 
                                            backgroundSize: 'cover', 
                                            opacity: 0.3, // Apply the opacity to the image
                                            zIndex: 1  // Make sure it's behind the button
                                        }} 
                                    />
                                    <Button
                                        type="primary"
                                        style={{
                                            backgroundColor: '#016989',
                                            borderColor: '#016989',
                                            color: '#FFF',
                                            padding: '30px 20px',
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            borderRadius: '6px',
                                            zIndex: 2, // Ensure the button appears above the background
                                            position: 'relative' // To make sure it's above the background div
                                        }}
                                    >
                                        See More
                                    </Button>                        
                                </Col>
                            </Row> 
                        </Card>  
                    </Col>    
                    <Col span={24} lg={12}>                   
                        <Card hoverable className="selectedSectorsCard" style={{ position: 'relative' }} onClick={handleSocioEnvironmentalCardClick} 
                            onTouchStart={(e) => {
                                e.currentTarget.startY = e.touches[0].clientY; // Store the initial Y position
                                }}
                                onTouchEnd={(e) => {
                                const endY = e.changedTouches[0].clientY;
                                const distance = Math.abs(endY - e.currentTarget.startY);

                                // If the finger didn't move more than 10px, it's considered a tap
                                if (distance < 10) {
                                    handleSocioEnvironmentalCardClick();
                                }
                            }}
                        >
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <Tooltip title={tooltips.Socio_Environmental_Indicators.description}>
                                            <div style={{ display: 'block', margin: 'auto' }}>
                                                Socio-Environmental Indicators <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />
                                            </div>
                                        </Tooltip>                  
                                    </Title> 
                                </Col>
                            </Row>
                            {chartData  && 
                                <Row span={24}> 
                                    <Col span={24} style={{ marginTop: 20 }}>                                         
                                        <PieChartData title={'Carbon Footprint (Kg of CO₂ equivalent)'} data={carboonFootprintData} />
                                    </Col>   
                                    <Col span={24} style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>              
                                        <RadarChartData data={chartData} />
                                    </Col>
                                    <Col span={24} style={{ marginTop: 20 }}>                                         
                                        <img src='/images/scores.png' alt="Logo" style={{ maxWidth: '65%' }}/>        
                                    </Col>
                                </Row>
                            }  
                        </Card>   
                    </Col>           
                </Row>
                <FloatButton 
                    icon={<QuestionCircleOutlined />} 
                    type="primary" 
                    target='new blank'
                    shape="square"
                    //href='https://docs.google.com/forms/d/e/1FAIpQLScDClOO6eA1Y_-YeyD79M_F9kwhm3-Z7YlXrU4fCT6dj-ropw/viewform'
                    style={{ insetInlineEnd: 60, width: 75, height: 75, backgroundColor: '#00678a', display: 'flex' }} 
                    className='feedbackBtn'
                    description="Feedback"
                    onClick={() => {
                        window.open(
                        'https://docs.google.com/forms/d/e/1FAIpQLScDClOO6eA1Y_-YeyD79M_F9kwhm3-Z7YlXrU4fCT6dj-ropw/viewform',
                        '_blank'
                        );
                    }}
                    onTouchStart={(e) => {
                        e.currentTarget.startY = e.touches[0].clientY;
                    }}
                    onTouchEnd={(e) => {
                        const endY = e.changedTouches[0].clientY;
                        const distance = Math.abs(endY - e.currentTarget.startY);

                        if (distance < 10) {
                            window.open(
                                'https://docs.google.com/forms/d/e/1FAIpQLScDClOO6eA1Y_-YeyD79M_F9kwhm3-Z7YlXrU4fCT6dj-ropw/viewform',
                                '_blank'
                            );
                        }
                    }}
                />
            </Layout>
        </Spin>
    )
}

export default SummaryResults;