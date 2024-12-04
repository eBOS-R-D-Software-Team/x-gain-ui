import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Layout, Table, Typography ,Tooltip , Modal,Button  } from 'antd';
import { stepsLabels, tooltips } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { EnvironmentalTableColumns, EnvironmentalCarbonFootprintColumns } from '../../Data/TableColumnsData';
import RadarChartData from '../../Components/ResultsElements/RadarChartData';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { formatDecimalNumber, environmentalTools } from '../../HelperFunctions';
import { PDFProvider } from '../../Context/PDF/PDFContext';
import { PDFEdgeEnablersTableProvider } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import SocioEnvironmentalIndicatorsPDF from '../../Components/PDFResults/SocioEnvironmentalIndicatorsPDF';
import { InfoCircleOutlined } from '@ant-design/icons';
import { formatDescription } from '../../HelperFunctions'




const { Title } = Typography;

function SocioEnvironmentalIndicators() {
    const [solutionData, setSolutionData] = useState([]);
    const [environmentalData, setEnvironmentalData] = useState({});
    const [edgeEnablersData, setEdgeEnablersData] = useState();
    const [carboonFootprintData, setCarboonFootprintData] = useState(null);
    const [radarData, setRadarData] = useState({
        labels: [], // Default empty labels
        datasets: [
            {
                label: 'Default Data', // 8 label
                data: [], // Default empty data
            },
        ],
    });

    const footprintChartRef = useRef(null);
    const radarChartRef = useRef(null);
    const scoresRef = useRef(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);


    useEffect(() => {
       // Load environmental data from localStorage
        const savedEnvironmentalData = localStorage.getItem('filteredEnvironmentalDataBySol');
        if (savedEnvironmentalData) {
            setEnvironmentalData(JSON.parse(savedEnvironmentalData));
        }

        // Load edge enablers data from localStorage
        const savedEdgeEnablersData = localStorage.getItem('connectivityEdgeEnablers');
        if (savedEdgeEnablersData) {
            setEdgeEnablersData(JSON.parse(savedEdgeEnablersData));
        }

        // Load radar data from localStorage
        const savedRadarData = localStorage.getItem('socialRadarData');
        if (savedRadarData) {
            setRadarData(JSON.parse(savedRadarData));
        }
    }, []);


    useEffect(() => {     
        const data = [
            ["Category", "Value"],
            [edgeEnablersData?.[0]?.join(', ') || [], environmentalData.cO2FPrEUD],
            [edgeEnablersData?.[1]?.join(', ') || [], environmentalData.cO2FPrNetw],
            [edgeEnablersData?.[2]?.End_dev_information.Number?.[0] + 'x ' + edgeEnablersData?.[2]?.End_dev_information.Type?.[0] || [], environmentalData.cO2FPrEnabl],
        ];

        setCarboonFootprintData(data); // Update the state with the fetched data  
    }, [environmentalData, edgeEnablersData]);


    useEffect(() => {
        const solData = JSON.parse(localStorage.getItem('solData'));

        if (solData) {
            setSolutionData(solData);
        }
        
        // Once all data is loaded, set the data loaded flag
        if (solData) {
            setIsDataLoaded(true);
        }
    }, []);

    
    const dataSourceTools = () => {
        return environmentalTools(edgeEnablersData, environmentalData)
    }


    const dataSource = [
        {
            key: '1',
            name: 'Combined carbon footprint from the network devices and edge enablers (kg of CO₂ equivalent)',
            value: formatDecimalNumber(environmentalData.combinedCarbonFootprint),
        },
    ];

    return(
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col className="title_results_col" span={24}>
                    <TitleForm 
                        icon={stepsLabels[11].icon} 
                        subicon={stepsLabels[11].subicon} 
                        title={stepsLabels[11].title} 
                        subtitle={stepsLabels[11].subtitle}
                        level={2} 
                        color={stepsLabels[11].color}
                    />
                    {isDataLoaded && (
                        <PDFProvider>
                            <PDFEdgeEnablersTableProvider>
                                <SocioEnvironmentalIndicatorsPDF 
                                    solutionData={solutionData}
                                    environmentalData={dataSourceTools()}
                                    carbonFootprintData={dataSource}
                                    footprintChartRef={footprintChartRef}
                                    radarChartRef={radarChartRef}
                                    scoresRef={scoresRef}
                                />
                            </PDFEdgeEnablersTableProvider>
                        </PDFProvider>
                    )}
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24} xl={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>
                            Environmental Assessment                      
                        </div>                 
                    </Title> 
                    <div style={{ marginTop: '30px'}}>
                        <Table 
                            columns={EnvironmentalTableColumns} 
                            dataSource={dataSourceTools()} 
                            pagination={false} 
                            bordered  
                            size='middle' 
                            scroll={{ x: 800 }} 
                            rowKey="key" 
                            rowHoverable={false}
                            components={{
                                header: {
                                    cell: (props) => (
                                        <th {...props} className="environmental-table-group">{props.children}</th>
                                    ),
                                },
                            }}
                        />  
                    </div>
                    <span style={{ display: 'flex', justifyContent: 'start', color: '#6F6F6F', fontSize: 12 }}>Environmental impact (functional unit: per 1 hour of use)</span>
                    <div style={{ marginTop: 50}}>
                        <Table 
                            columns={EnvironmentalCarbonFootprintColumns} 
                            dataSource={dataSource} 
                            pagination={false} 
                            bordered  
                            size='large' 
                            rowKey="key" 
                            rowHoverable={false}
                        />  
                    </div>
                    <div ref={footprintChartRef} style={{ marginTop: 50 }}>                                         
                        <PieChartData title={'Carbon Footprint (Kg of CO₂ equivalent)'} data={carboonFootprintData} />
                    </div> 
                </Col>
                <Col span={24} xl={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>                            
                            <Tooltip title="Click to view Social Assessment info" placement="top">
                                <span style={{ cursor: 'pointer' }} onClick={handleModalOpen}>
                                    Social Assessment 
                                    <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 30, color: "#00678A" }} />
                                </span>
                            </Tooltip>                            
                            <Modal
                                title="Social Assessment Details"
                                open={isModalOpen}
                                onCancel={handleModalClose}
                                footer={[
                                    <Button key="close" type="primary" onClick={handleModalClose}>
                                        Close
                                    </Button>,
                                ]}
                                style={{ width: '50%', top: 20 }}
                                styles={{
                                    body: {
                                        maxHeight: '60vh',
                                        overflowY: 'auto',
                                    },
                                }}
                                centered
                            >
                                <div style={{ whiteSpace: 'pre-wrap' }}>
                                    {formatDescription(tooltips.socialAssessment.description)}
                                </div>
                            </Modal>
                        </div>               
                    </Title>  
                    <div ref={radarChartRef} style={{ marginTop: '30px', display: 'flex', justifyContent: 'center'}}>
                        <RadarChartData data={radarData} />
                    </div>  
                    <div ref={scoresRef} style={{ marginTop: 20 }}>                                         
                        <img src='/images/scores.png' alt="Logo" style={{ maxWidth: '100%' }}/>        
                    </div>              
                </Col>
            </Row>
        </Layout>
    )
}

export default SocioEnvironmentalIndicators;