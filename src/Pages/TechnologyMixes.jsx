import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Layout, Typography, Spin, Checkbox, Tooltip } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels ,tooltips } from '../Data/Data';
import TechnologyMixesTable from '../Components/ResultsElements/TechnologyMixesTable';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;


const TechnologyMixes = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const location = useLocation();

    const { highestSolItems } = location.state || {};  // Retrieve data
 
    console.log('Top 10 items in Technology Mixes:', highestSolItems);


    const handleRowClick = (record) => {
        setLoading(true);
        console.log('jfdjfjfjfjfjfjfj', highestSolItems);
        const originalRecord = highestSolItems?.find(item => item.Sol_ID === record.groupKey);
        setTimeout(() => {
            navigate(`/solution/${record.groupKey}/summary-results`, { state: { solutionData: originalRecord } });
        }, 3000);
    };

    
    const onCheckboxChange = (e) => {
        setLoading(true); // Show loading while filtering
        setShowAll(e.target.checked);
        setTimeout(() => {
            setLoading(false); // Reset loading after filter state is updated
        }, 500);
    };

    // Filter items based on the checkbox state
    const filteredHighestSolItems = highestSolItems?.filter(item => 
        showAll || !item.Connectivity_information.Existing_connectivity
    );

    return (
        <Spin spinning={loading} tip="Loading...">
            <Layout style={{ backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]} style={{ margin: '10px 20px'}}>
                    <TitleForm 
                        icon={stepsLabels[6].icon} 
                        subicon={stepsLabels[6].subicon} 
                        title={stepsLabels[6].title} 
                        subtitle={stepsLabels[6].subtitle}
                        level={2} 
                        color={stepsLabels[6].color}
                        tooltips={tooltips.resultsmixesInfoButton.description}
                    />

                    <Col span={24} className="technologyMixesContentCol">
                        <div style={{ width:'100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '8px',
                            marginBottom: '8px',
                            borderRadius: '4px',
                        }}>
                            <Checkbox
                                onChange={onCheckboxChange}
                            />
                            <div style={{ display: 'flex', alignItems: 'end' }}>      
                                <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}> 
                                    <Tooltip title={tooltips.publicInternetmixes.description}>
                                        Existing Connectivity  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 19, color: "#006187" }} />
                                    </Tooltip>
                                </span>
                            </div>
                        </div>

                        <Title level={2} style={{ backgroundColor: "#BEE1D9", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '16px', borderRadius: '10px', color: 'black', display: 'flex' }}>                
                            <div style={{ display: 'block', margin: 'auto' }}>
                                Connectivity & Processing Enablers                      
                            </div>                 
                        </Title>     

                        <TechnologyMixesTable 
                            items={filteredHighestSolItems} 
                            onRowClick={(record) => ({
                                onClick: () => handleRowClick(record), // Make the entire row clickable
                            })}
                        />
                    </Col>
                </Row>
            </Layout>
        </Spin>
    );
};

export default TechnologyMixes;
