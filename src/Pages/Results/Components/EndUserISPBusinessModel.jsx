import React from 'react';
import { Row, Col, Card } from 'antd';
import BusinessModelCard from '../../../Components/ResultsElements/BusinessModelCard';

const EndUserISPBusinessModel = ({data}) => { 
    return (
        <>     
            <Row gutter={[32, 12]} style={{ justifyContent: 'center', textAlign: 'left', margin: '0px 5px', paddingTop: '30px'}}>
                <Col span={12} xs={24} sm={12} xl={10} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <Card>
                        <p style={{ color: '#707070' }}><span style={{ color: '#00A27B', fontWeight: 700 }}>Sectors: </span>{ Array.isArray(data.sector) ? data.sector.join(', ') : data.sector }</p>
                        {data.service !== '' && <p style={{ color: '#707070' }}><span style={{ color: '#00A27B', fontWeight: 700 }}>Services: </span>{ data.service }</p>}
                        <p style={{ color: '#707070' }}><span style={{ color: '#00A27B', fontWeight: 700 }}>User Type: </span>{ data.user_type }</p>
                    </Card>
                </Col>
                {data.hasOwnProperty("label_canvastitle") &&
                    <Col span={12} xs={24} sm={12} xl={10} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                        <Card>
                            <p style={{ color: '#707070' }}>{ data.label_canvastitle }</p>
                        </Card>
                    </Col>
                }
            </Row>
            <Row gutter={16} style={{ justifyContent: 'center', textAlign: 'left', margin: '0 5px', paddingTop: '30px'}}>
                <Col span={2} xs={24} sm={12} md={8} lg={6} xxl={4} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label1_title} content={data.label1_content} icon={`/images/business-model-icons/key_partners.png`} color={''} />                   
                </Col>
                <Col span={2} xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label2_title} content={data.label2_content} icon={`/images/business-model-icons/key_activities.png`} color={''} />                   
                    <BusinessModelCard type={'endUserISP'} title={data.label7_title} content={data.label7_content} icon={`/images/business-model-icons/key_resources.png`} color={''} />                   
                </Col>
                <Col span={2} xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label3_title} content={data.label3_content} icon={`/images/business-model-icons/value_propositions.png`} color={''} />                   
                </Col>
                <Col span={2} xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label4_title} content={data.label4_content} icon={`/images/business-model-icons/customer_relationships.png`} color={''} /> 
                    <BusinessModelCard type={'endUserISP'} title={data.label6_title} content={data.label6_content} icon={`/images/business-model-icons/channels.png`} color={''} />                   
                </Col>
                <Col span={2} xs={24} sm={12} md={8} lg={6} xl={4} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label5_title} content={data.label5_content} icon={`/images/business-model-icons/customer_segments.png`} color={''} />
                </Col>
            </Row>
            <Row gutter={16} style={{ justifyContent: 'center', textAlign: 'left', margin: '0 5px', paddingBottom: '40px', }}>
                <Col span={10} xs={24} lg={10} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label9_title} content={data.label9_content} icon={`/images/business-model-icons/cost_structure.png`} color={''} />                  
                </Col>
                <Col span={10} xs={24} lg={10} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'endUserISP'} title={data.label10_title} content={data.label10_content} icon={`/images/business-model-icons/revenew_streams.png`} color={''} />
                </Col>
            </Row>
        </>
    );
}

export default EndUserISPBusinessModel;
