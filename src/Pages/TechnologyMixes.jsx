import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Layout, Typography } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels } from '../Data/Data';
import TechnologyMixesTable from '../Components/ResultsElements/TechnologyMixesTable';

const { Title } = Typography;


const TechnologyMixes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { highestSolItems } = location.state || {};  // Retrieve data
 
    console.log('Top 3 items in Technology Mixes:', highestSolItems);

    const handleRowClick = (record) => {
        navigate(`/solution/${record.Sol_ID}/summary-results`, { state: { data: record } });
    };

    return (
        <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
            <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                <Col span={24}>
                    <TitleForm 
                        icon={stepsLabels[5].icon} 
                        subicon={stepsLabels[5].subicon} 
                        title={stepsLabels[5].title} 
                        subtitle={stepsLabels[5].subtitle}
                        level={2} 
                        color={'#158D6B'}
                    />
                </Col>

                <Col span={24} style={{ padding: '0 60px' }}>
                    <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '16px', borderRadius: '10px', color: 'black', display: 'flex' }}>                
                        <div style={{ display: 'block', margin: 'auto' }}>
                            Connectivity & Edge Enablers                      
                        </div>                 
                    </Title>     

                    <TechnologyMixesTable 
                        items={highestSolItems} 
                        onRowClick={(record) => ({
                            onClick: () => handleRowClick(record), // Make the entire row clickable
                        })}
                    />
                </Col>
            </Row>
        </Layout>
    );
};

export default TechnologyMixes;
