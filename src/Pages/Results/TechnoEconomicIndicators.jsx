import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Layout, Table, Typography , Tooltip } from 'antd';
import { stepsLabels , tooltips } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import CapexOpexTable from './Components/CapexOpexTable';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import ColumnChartData from '../../Components/ResultsElements/ColumnChartData';
import { totalCapexOpexColumns } from '../../Data/TableColumnsData';
import 'jspdf-autotable';
import TechnoEconomicIndicatorsPDF from '../../Components/PDFResults/TechnoEconomicIndicatorsPDF';
import { PDFProvider } from '../../Context/PDF/PDFContext';
import { PDFEdgeEnablersTableProvider } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import { processPieChartData, processColumnChartData, formatDecimalNumber } from '../../Utils/ResultsUtils';
import { InfoCircleOutlined } from '@ant-design/icons';


const { Title } = Typography;

function TechnoEconomicIndicators() {
    const [solutionData, setSolutionData] = useState([]);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState({});
    const [solarAnalysisData, setSolarAnalysisData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // Refs for chart elements
    const capexChartRef = useRef(null);
    const capexBreakdownChartRef = useRef(null);
    const opexChartRef = useRef(null);
    const opexBreakdownChartRef = useRef(null);    

    useEffect(() => {
        const solData = JSON.parse(localStorage.getItem('solData'));
        const filteredSolAnalysisDataBySol = JSON.parse(localStorage.getItem('filteredSolutionAnalysisDataBySol'));
        const filteredSolarAnalysisDataBySol = JSON.parse(localStorage.getItem('filteredSolarAnalysisDataBySol'));
        console.log(filteredSolarAnalysisDataBySol);
        if (solData) {
            setSolutionData(solData);
        }

        if (filteredSolAnalysisDataBySol) {
            setSolutionAnalysisData(filteredSolAnalysisDataBySol);
        }

        if (filteredSolarAnalysisDataBySol) {
            setSolarAnalysisData(filteredSolarAnalysisDataBySol);
        }

        // Once all data is loaded, set the data loaded flag
        if (solData && filteredSolAnalysisDataBySol) {
            setIsDataLoaded(true);
        }

        console.log(solData);
    }, []);

    // Ensure periods and capexPerComponentTS exist before mapping
    const periodsExist = Array.isArray(solutionAnalysisData.periods) && solutionAnalysisData.periods.length > 0;
    const capexDataExist = solutionAnalysisData.capexPerComponentTS && typeof solutionAnalysisData.capexPerComponentTS === 'object';


    useEffect(() => {
        if (solutionAnalysisData) {
            if (solutionAnalysisData.capexPerLayer) {
                const capexChartData = processPieChartData(solutionAnalysisData.capexPerLayer);
                setCapexCategoryData(capexChartData);
            }
    
            if (solutionAnalysisData.opexPerCategory) {
                const opexChartData = processPieChartData(solutionAnalysisData.opexPerCategory);
                setOpexCategoryData(opexChartData);
            }
        }
    }, [solutionAnalysisData]);


    const capexColumnsData = processColumnChartData(periodsExist, capexDataExist, solutionAnalysisData.periods, solutionAnalysisData.capexPerLayerTS, 'Capex');
    const opexColumnsData = processColumnChartData(periodsExist, capexDataExist, solutionAnalysisData.periods, solutionAnalysisData.opexPerCategoryTS, 'Opex');

    const dataSource = [
        {
            key: '1',
            name: (
                    <Tooltip title={tooltips.Total_Cost.description}>
                        Total Cost (€) <InfoCircleOutlined style={{ marginLeft: 5, fontSize: 17,color: "#ffffff", fontWeight: "bold" }} />
                    </Tooltip>           
                   ) ,
            value: formatDecimalNumber(solutionAnalysisData.totalCost),
            solarvalue: formatDecimalNumber(solarAnalysisData.totalCost),
        },
        {
            key: '2',
            name: 'Total CAPEX (€)',
            value: formatDecimalNumber(solutionAnalysisData.totalCapex),
            solarvalue: formatDecimalNumber(solarAnalysisData.totalCapex),
        },
        {
            key: '3',
            name: 'Total OPEX (€)',
            value: formatDecimalNumber(solutionAnalysisData.totalOpex),
            solarvalue: formatDecimalNumber(solarAnalysisData.totalOpex),
        },
    ];
    
    
    return(
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px', justifyContent: 'center' }}>
                <Col className="title_results_col" span={24}>
                    <TitleForm 
                        icon={stepsLabels[9].icon} 
                        subicon={stepsLabels[9].subicon} 
                        title={stepsLabels[9].title} 
                        subtitle={stepsLabels[9].subtitle}
                        level={2} 
                        color={stepsLabels[9].color}
                    />
                    {isDataLoaded && (
                        <PDFProvider>
                            <PDFEdgeEnablersTableProvider>
                                <TechnoEconomicIndicatorsPDF 
                                    solutionAnalysisData={solutionAnalysisData}
                                    solarAnalysisData={solarAnalysisData}
                                    solutionData={solutionData}
                                    capexChartRef={capexChartRef}
                                    capexBreakdownChartRef={capexBreakdownChartRef}
                                    opexChartRef={opexChartRef}
                                    opexBreakdownChartRef={opexBreakdownChartRef}
                                />
                            </PDFEdgeEnablersTableProvider>
                        </PDFProvider>
                    )}
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px'}}>
                <Col span={24} xl={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <Tooltip title={tooltips.CAPEX_Analysis.description}>
                            <div style={{ display: 'block', margin: 'auto' }}>
                                CAPEX Analysis <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />                 
                            </div>
                        </Tooltip>                 
                    </Title> 
                    <CapexOpexTable 
                        title={'CAPEX Per Component'} 
                        name={'capexPerComponent'} 
                        data={solutionAnalysisData.capexPerComponentTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={solutionAnalysisData.capexTotalTS}
                        categoryTotal={null}
                    />
                    <CapexOpexTable 
                        title={'CAPEX Per Layer'} 
                        name={'capexPerLayer'} 
                        data={solutionAnalysisData.capexPerLayerTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionAnalysisData.capexPerLayer}
                    />
                </Col>
                <Col span={24} xl={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <Tooltip title={tooltips.OPEX_Analysis.description}>
                            <div style={{ display: 'block', margin: 'auto' }}>
                                OPEX Analysis <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 25, color: "#00678A" }} />                    
                            </div>
                        </Tooltip>                 
                    </Title> 
                    <CapexOpexTable 
                        title={'OPEX Per Category'} 
                        name={'opexPerCategory'} 
                        data={solutionAnalysisData.opexPerCategoryTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={solutionAnalysisData.opexTotalTS}
                        categoryTotal={solutionAnalysisData.opexPerCategory}
                    />
                    <CapexOpexTable 
                        title={'OPEX Per Layer'} 
                        name={'opexPerLayer'} 
                        data={solutionAnalysisData.opexPerLayerTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionAnalysisData.opexPerLayer}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px'}}>
                <Col span={24} xl={9}>   
                    <div ref={capexChartRef}>          
                        <ColumnChartData title={'CAPEX'} data={capexColumnsData} />
                    </div>
                    <div ref={capexBreakdownChartRef}>             
                        <PieChartData title={'CAPEX Breakdown'} data={capexCategoryData} />
                    </div>
                </Col>
                <Col span={24} xl={6} style={{ alignContent: 'center' }}> 
                    <Table 
                        columns={totalCapexOpexColumns} 
                        dataSource={dataSource} 
                        pagination={false} 
                        bordered  
                        size='large' 
                        scroll={{ x: 300 }}                         
                        rowKey="key" 
                        rowHoverable={false}
                        className='totalCapexOpexTable'
                    />  
                </Col>
                <Col span={24} xl={9}>
                    <div ref={opexChartRef}>          
                        <ColumnChartData title={'OPEX'} data={opexColumnsData} />
                    </div>
                    <div ref={opexBreakdownChartRef}>             
                        <PieChartData title={'OPEX Breakdown'} data={opexCategoryData} />
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

export default TechnoEconomicIndicators;