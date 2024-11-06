import React, {useState, useEffect, useRef} from 'react';
import { Row, Col, Layout, Table, Typography } from 'antd';
import { stepsLabels } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import CapexOpexTable from './Components/CapexOpexTable';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { processPieChartData, processColumnChartData } from '../../HelperFunctions';
import ColumnChartData from '../../Components/ResultsElements/ColumnChartData';
import { totalCapexOpexColumns } from '../../Data/TableColumnsData';
import 'jspdf-autotable';
import TechnoEconomicIndicatorsPDF from '../../Components/PDFResults/TechnoEconomicIndicatorsPDF';
import { PDFProvider } from '../../Context/PDF/PDFContext';
import { PDFEdgeEnablersTableProvider } from '../../Context/PDF/PDFEdgeEnablersTableContext';
import { formatDecimalNumber } from '../../HelperFunctions';

const { Title } = Typography;

function TechnoEconomicIndicators() {
    const [solutionData, setSolutionData] = useState([]);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);

    // Refs for chart elements
    const capexChartRef = useRef(null);
    const capexBreakdownChartRef = useRef(null);
    const opexChartRef = useRef(null);
    const opexBreakdownChartRef = useRef(null);

    console.log(capexChartRef)
    

    useEffect(() => {
        const solData = JSON.parse(localStorage.getItem('solData'));
        const filteredSolAnalysisDataBySol = JSON.parse(localStorage.getItem('filteredSolutionAnalysisDataBySol'));

        if (solData) {
            setSolutionData(solData);
        }

        if (filteredSolAnalysisDataBySol) {
            setSolutionAnalysisData(filteredSolAnalysisDataBySol);
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
            name: 'Total Cost',
            value: formatDecimalNumber(solutionAnalysisData.totalCost),
        },
        {
            key: '2',
            name: 'Total CAPEX',
            value: formatDecimalNumber(solutionAnalysisData.totalCapex),
        },
        {
            key: '3',
            name: 'Total OPEX',
            value: formatDecimalNumber(solutionAnalysisData.totalOpex),
        },
    ];
    
    
    return(
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col className="title_results_col" span={24} style={{ display: 'flex'}}>
                    <TitleForm 
                        icon={stepsLabels[8].icon} 
                        subicon={stepsLabels[8].subicon} 
                        title={stepsLabels[8].title} 
                        subtitle={stepsLabels[8].subtitle}
                        level={2} 
                        color={stepsLabels[8].color}
                    />
                    <PDFProvider>
                        <PDFEdgeEnablersTableProvider>
                            <TechnoEconomicIndicatorsPDF 
                                solutionAnalysisData={solutionAnalysisData}
                                solutionData={solutionData}
                                capexChartRef={capexChartRef}
                                capexBreakdownChartRef={capexBreakdownChartRef}
                                opexChartRef={opexChartRef}
                                opexBreakdownChartRef={opexBreakdownChartRef}
                            />
                        </PDFEdgeEnablersTableProvider>
                    </PDFProvider>
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24} lg={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>
                            CAPEX Analysis                      
                        </div>                 
                    </Title> 
                    <CapexOpexTable 
                        title={'CAPEX Per Component'} 
                        data={solutionAnalysisData.capexPerComponentTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={solutionAnalysisData.capexTotalTS}
                        categoryTotal={null}
                    />
                    <CapexOpexTable 
                        title={'CAPEX Per Layer'} 
                        data={solutionAnalysisData.capexPerLayerTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionAnalysisData.capexPerLayer}
                    />
                </Col>
                <Col span={24} lg={12}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '2px', borderRadius: '10px', color: 'black', display: 'flex', margin: 0 }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>
                            OPEX Analysis                     
                        </div>                 
                    </Title> 
                    <CapexOpexTable 
                        title={'OPEX Per Category'} 
                        data={solutionAnalysisData.opexPerCategoryTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={solutionAnalysisData.opexTotalTS}
                        categoryTotal={solutionAnalysisData.opexPerCategory}
                    />
                    <CapexOpexTable 
                        title={'OPEX Per Layer'} 
                        data={solutionAnalysisData.opexPerLayerTS} 
                        periods={solutionAnalysisData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionAnalysisData.opexPerLayer}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24} lg={8} style={{ marginTop: 30 }}>   
                    <div ref={capexChartRef}>          
                        <ColumnChartData title={'CAPEX'} data={capexColumnsData} />
                    </div>
                </Col>
                <Col span={24} lg={8} style={{ marginTop: 30 }}> 
                    <div ref={capexBreakdownChartRef}>             
                        <PieChartData title={'CAPEX Breakdown'} data={capexCategoryData} />
                    </div>
                    <Table 
                        columns={totalCapexOpexColumns} 
                        dataSource={dataSource} 
                        pagination={false} 
                        bordered  
                        size='large' 
                        rowKey="key" 
                        rowHoverable={false}
                    />  
                </Col>
                <Col span={24} lg={8}>
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