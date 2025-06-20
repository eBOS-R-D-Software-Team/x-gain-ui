import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Layout, Table, Typography, Tooltip, Modal, Button, Card } from 'antd';
import { stepsLabels, tooltips } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import { EnvironmentalTableColumns, EnvironmentalCarbonFootprintColumns } from '../../Data/TableColumnsData';
import RadarChartData from '../../Components/ResultsElements/RadarChartData';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { PDFProvider } from '../../Context/PDF/PDFContext';
import { PDFEdgeEnablersTableProvider } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import SocioEnvironmentalIndicatorsPDF from '../../Components/PDFResults/SocioEnvironmentalIndicatorsPDF';
import { InfoCircleOutlined } from '@ant-design/icons';
import { environmentalTools, formatDescription } from '../../Utils/ResultsUtils';
import { MdElectricBolt } from "react-icons/md";
import CountriesSolarElectricityModal from '../../Components/ResultsElements/CountriesSolarElectricityModal';

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
    const [isSolarModalOpen, setIsSolarModalOpen] = useState(false);
    const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);


    useEffect(() => {
       // Load environmental data from localStorage
        const savedEnvironmentalData = localStorage.getItem('filteredEnvironmentalDataBySol');
        if (savedEnvironmentalData) {
            setEnvironmentalData(JSON.parse(savedEnvironmentalData));
        }

        // Load edge enablers data from localStorage
        const savedEdgeEnablersData = JSON.parse(localStorage.getItem('connectivityEdgeEnablers'));
        if (savedEdgeEnablersData) {
            setEdgeEnablersData(savedEdgeEnablersData);
        }

        // Load radar data from localStorage
        const savedRadarData = localStorage.getItem('socialRadarData');
        if (savedRadarData) {
            setRadarData(JSON.parse(savedRadarData));
        }
    }, [solutionData]);


    useEffect(() => {     
        const data = [
            ["Category", "Value"],
            [edgeEnablersData?.[0]?.join(', ') || [], parseFloat(environmentalData.cO2FPrNetw)],
            [edgeEnablersData?.[1]?.join(', ') || [], parseFloat(environmentalData.cO2FPrEnabl)],
            [edgeEnablersData?.[3]?.join(', ') || [], parseFloat(environmentalData.cO2FPrEUD)],
        ];
        
        setCarboonFootprintData(data); // Update the state with the fetched data  
        console.log(edgeEnablersData);
    }, [environmentalData, edgeEnablersData]);


    useEffect(() => {
        const solData = JSON.parse(localStorage.getItem('solData'));

        if (solData) {
            setSolutionData(solData);
        }
    }, []);

    
    const dataSourceTools = () => {
        console.log(edgeEnablersData, environmentalData.solution);
        return environmentalTools(edgeEnablersData, environmentalData)
    }


    const dataSource = [
        {
            key: '1',
            name: 'Combined carbon footprint from the network devices and edge enablers (kg of CO₂ equivalent)',
            value: environmentalData.combinedCarbonFootprint,
        },
    ];

    return(
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
                    {edgeEnablersData?.[2] && radarData?.labels?.length > 0 && environmentalData && (
                        <PDFProvider>
                            <PDFEdgeEnablersTableProvider>
                                <SocioEnvironmentalIndicatorsPDF 
                                    solutionData={edgeEnablersData[2]}
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
            <Row gutter={[32, 16]} style={{ margin: '10px'}}>
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
                    <span style={{ display: 'flex', justifyContent: 'start', color: '#6F6F6F', fontSize: 12 }}>Environmental impact (functional unit: per day of use)</span>
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
                    <Card 
                        style={{ margin: '40px 0' }}
                        hoverable={true}
                        className="solarElectricityCol"
                        onClick={() => setIsSolarModalOpen(true)}
                        onTouchStart={(e) => {
                            e.currentTarget.startY = e.touches[0].clientY; // Store the initial Y position
                        }}
                        onTouchEnd={(e) => {
                            const endY = e.changedTouches[0].clientY;
                            const distance = Math.abs(endY - e.currentTarget.startY);

                            // If the finger didn't move more than 10px, it's considered a tap
                            if (distance < 10) {
                                setIsSolarModalOpen(true);
                            }
                        }}
                    >
                        <MdElectricBolt size={100} color='#E2C779'/>
                        <Title level={4} style={{ padding: '2px', borderRadius: '10px', color: '#595959', margin: 0 }}>                                       
                            Potential percentage reduction in carbon footprint switching from your national electricity mix to solar PV power                                      
                        </Title>  
                    </Card>
                    <Modal
                        title="EU Countries Solar Emission Data"
                        centered
                        open={isSolarModalOpen}
                        onCancel={() => setIsSolarModalOpen(false)}
                        footer={null}
                        width={1000}
                    >
                        <CountriesSolarElectricityModal/>
                    </Modal>               
                </Col>
                <Col span={24} xl={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>                            
                            <Tooltip title="Click to view Social Assessment info" placement="top">
                                <span style={{ cursor: 'pointer' }} onClick={() => setIsSocialModalOpen(true)}>
                                    Social Assessment 
                                    <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 30, color: "#00678A" }} />
                                </span>
                            </Tooltip>                            
                            <Modal
                                title="Social Assessment Details"
                                open={isSocialModalOpen}
                                onCancel={() => setIsSocialModalOpen(false)}
                                footer={[
                                    <Button key="close" type="primary" onClick={() => setIsSocialModalOpen(false)}>
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
                        <img src='/images/scores.png' alt="Logo" style={{ maxWidth: '65%' }}/>        
                    </div>              
                </Col>
            </Row>
        </Layout>
    )
}

export default SocioEnvironmentalIndicators;