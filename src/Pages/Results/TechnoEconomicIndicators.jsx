import React, {useState, useEffect} from 'react';
import { Row, Col, Layout, Table, Typography } from 'antd';
import { stepsLabels } from '../../Data/Data';
import TitleForm from '../../Components/WizardElements/TitleForm';
import CapexOpexTable from './Components/CapexOpexTable';
import PieChartData from '../../Components/ResultsElements/PieChartData';
import { processPieChartData, processColumnChartData } from '../../HelperFunctions';
import ColumnChartData from '../../Components/ResultsElements/ColumnChartData';
import { totalCapexOpexColumns } from '../../Data/TableColumnsData';

const { Title } = Typography;

function TechnoEconomicIndicators() {
    const [solutionData, setSolutionData] = useState({});
    const [capexCategoryData, setCapexCategoryData] = useState([['Category', 'Amount']]);
    const [opexCategoryData, setOpexCategoryData] = useState([['Category', 'Amount']]);

    useEffect(() => {
        const savedData = localStorage.getItem('filteredSolutionAnalysisDataBySol');
        if (savedData) {
            setSolutionData(JSON.parse(savedData));
        }
    }, []);

    // Ensure periods and capexPerComponentTS exist before mapping
    const periodsExist = Array.isArray(solutionData.periods) && solutionData.periods.length > 0;
    const capexDataExist = solutionData.capexPerComponentTS && typeof solutionData.capexPerComponentTS === 'object';


    useEffect(() => {
        if (solutionData) {
            if (solutionData.capexPerLayer) {
                const capexChartData = processPieChartData(solutionData.capexPerLayer);
                setCapexCategoryData(capexChartData);
            }
    
            if (solutionData.opexPerCategory) {
                const opexChartData = processPieChartData(solutionData.opexPerCategory);
                setOpexCategoryData(opexChartData);
            }
        }
    }, [solutionData]);


    const capexColumnsData = processColumnChartData(periodsExist, capexDataExist, solutionData.periods, solutionData.capexPerLayerTS, 'Capex');
    const opexColumnsData = processColumnChartData(periodsExist, capexDataExist, solutionData.periods, solutionData.opexPerCategoryTS, 'Opex');

    const dataSource = [
        {
            key: '1',
            name: 'Total Cost',
            value: solutionData.totalCost,
        },
        {
            key: '2',
            name: 'Total CAPEX',
            value: solutionData.totalCapex,
        },
        {
            key: '3',
            name: 'Total OPEX',
            value: solutionData.totalOpex,
        },
    ];
    
    
    return(
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24}>
                    <TitleForm 
                        icon={stepsLabels[8].icon} 
                        subicon={stepsLabels[8].subicon} 
                        title={stepsLabels[8].title} 
                        subtitle={stepsLabels[8].subtitle}
                        level={2} 
                        color={stepsLabels[8].color}
                    />
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
                        data={solutionData.capexPerComponentTS} 
                        periods={solutionData.periods} 
                        yearlyTotal={solutionData.capexTotalTS}
                        categoryTotal={null}
                    />
                    <CapexOpexTable 
                        title={'CAPEX Per Layer'} 
                        data={solutionData.capexPerLayerTS} 
                        periods={solutionData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionData.capexPerLayer}
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
                        data={solutionData.opexPerCategoryTS} 
                        periods={solutionData.periods} 
                        yearlyTotal={solutionData.opexTotalTS}
                        categoryTotal={solutionData.opexPerCategory}
                    />
                    <CapexOpexTable 
                        title={'OPEX Per Layer'} 
                        data={solutionData.opexPerLayerTS} 
                        periods={solutionData.periods} 
                        yearlyTotal={null}
                        categoryTotal={solutionData.opexPerLayer}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24} lg={8} style={{ marginTop: 30 }}>              
                    <ColumnChartData title={'CAPEX'} data={capexColumnsData} />
                </Col>
                <Col span={24} lg={8} style={{ marginTop: 30 }}>              
                    <PieChartData title={'CAPEX Breakdown'} data={capexCategoryData} />
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
                    <ColumnChartData title={'OPEX'} data={opexColumnsData} />
                    <PieChartData title={'OPEX Breakdown'} data={opexCategoryData} />
                </Col>
            </Row>
        </Layout>
    )
}

export default TechnoEconomicIndicators;