import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Typography, Card, Spin, Button } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { stepsLabels } from '../../Data/Data';
import SelectedSectorItem from '../../Components/ResultsElements/SelectedSectorItem';
import SelectedConnectivityEdgeEnablers from '../../Components/ResultsElements/SelectedConnectivityEdgeEnablers';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { processPieChartData } from '../../HelperFunctions';
import RadarChartData from '../../Components/ResultsElements/RadarChartData';

const { Title } = Typography;

function SummaryResults() {
    const location = useLocation();
    const navigate = useNavigate();

    const { solutionData } = location.state || {};  // Retrieve the data passed from the previous component
    const [sectorServiceData, setSectorServiceData] = useState(null);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState([]);
    const [socialScoresData, setSocialScoresData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [filteredSolutionAnalysisData, setFilteredSolutionAnalysisData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        try {
            const storedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
            const storedSolutionAnalysisData = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));
            const socialAnswersScores = JSON.parse(localStorage.getItem('socialAnswersResponse'));

            if (storedSectorServiceData) {
                setSectorServiceData(storedSectorServiceData);
            }
            if (storedSolutionAnalysisData) {
                setSolutionAnalysisData(storedSolutionAnalysisData);
            }
            if (socialAnswersScores) {
                setSocialScoresData(socialAnswersScores);
            }
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }, []);


    useEffect(() => {
        console.log('Solution Analysis data:', solutionAnalysisData);

        const filteredData = solutionAnalysisData.analysisResults?.find(item => item.id === solutionData?.Sol_ID.toString());
        if (filteredData && filteredData !== filteredSolutionAnalysisData) {
            setFilteredSolutionAnalysisData(filteredData);
            localStorage.setItem('filteredSolutionAnalysisDataBySol', JSON.stringify(filteredSolutionAnalysisData));
        }
        console.log('Filtered data:', filteredSolutionAnalysisData);
    }, [solutionData, solutionAnalysisData]);

 
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
        const fetchData = async () => {
            try {
                const questions = socialScoresData.map(item => item.category);
                const scores = socialScoresData.map(item => item.score);
        
                setChartData({
                    labels: questions,
                    datasets: [
                        {
                            label: 'Scores',
                            data: scores,
                            borderColor: 'rgba(54, 162, 235, 1)',
                            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                        },
                    ],
                });
      
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
      
        // Fetch data once when the component mounts
        fetchData();
    }, [socialScoresData]);
    

    const handleCardClick = () => {
        setLoading(true);
        localStorage.setItem('filteredSolutionAnalysisDataBySol', JSON.stringify(filteredSolutionAnalysisData));

        setTimeout(() => {
            navigate('/techno-economic-indicators');
        }, 1000);
    };

    const handleBusinessModelClick = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/business-model');
        }, 1000);
    };


    const netsLength = solutionData.Connectivity_information.Nets.length;
    const netsData = solutionData.Connectivity_information.Nets.slice(0, netsLength).map((net, index) => {
        if (!net || !solutionData.Connectivity_information.Number[index]) {
            return null;  // Return null if either is missing
        }
      
        return `${solutionData.Connectivity_information.Number[index]}x ${net}`;
    }).filter(item => item !== null);

    
    const enablersLength = solutionData.Processing_information.Process_Dev_per_layer.length;
    const enablersData = solutionData.Processing_information.Process_Dev_per_layer.slice(0, enablersLength).map((dev, index) => {
        // Get the number value for the current index, handling cases where it's empty
        const numberValue = solutionData.Processing_information.Number[index]?.length > 0 
            ? solutionData.Processing_information.Number[index] 
            : 0;

        if (dev.length > 0) {
            return `${numberValue}x ${dev}`;
        }

        return null;
    });

    // Filtering out null values (from empty arrays) before displaying
    const filteredEnablersData = enablersData.filter(item => item !== null);

    
    return(
        <Spin spinning={loading} tip="Loading...">
            <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                    <Col span={24}>
                        <TitleForm 
                            icon={stepsLabels[7].icon} 
                            subicon={stepsLabels[7].subicon} 
                            title={stepsLabels[7].title} 
                            subtitle={stepsLabels[7].subtitle}
                            level={2} 
                            color={stepsLabels[7].color}
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
                                    <SelectedConnectivityEdgeEnablers text={netsData.join(', ')}/>
                                    {filteredEnablersData.length > 0 && (
                                        filteredEnablersData.map((item, idx) => <SelectedConnectivityEdgeEnablers key={item.id || idx} text={item}/>))
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
                                            Techno-economic Indicators                      
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
                    <Col span={24} lg={12} xxl={8}>                   
                        <Card hoverable bordered={false} className="selectedSectorsCard" onClick={handleCardClick}>
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <div style={{ display: 'block', margin: 'auto' }}>
                                            Socio-Environmental Indicators                      
                                        </div>                 
                                    </Title> 
                                </Col>
                            </Row>
                            {chartData  && 
                                <Row span={24}>    
                                    <Col span={24} style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>              
                                        <RadarChartData data={chartData} />
                                    </Col>
                                </Row>
                            }  
                        </Card>   
                    </Col>           
                    <Col span={24} lg={12} xxl={8}>                   
                        <Card hoverable bordered={false} className="selectedSectorsCard" onClick={handleBusinessModelClick}>
                            <Row>
                                <Col span={24}>
                                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                                        <div style={{ display: 'block', margin: 'auto' }}>
                                            Business Model                      
                                        </div>                 
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
                </Row>
            </Layout>
        </Spin>
    )
}

export default SummaryResults;