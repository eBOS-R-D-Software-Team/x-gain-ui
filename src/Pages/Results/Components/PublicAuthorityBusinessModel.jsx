import React from 'react';
import { Row, Col, Card } from 'antd';
import BusinessModelCard from '../../../Components/ResultsElements/BusinessModelCard';

const PublicAuthorityBusinessModel = ({data}) => { 
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
            <Row gutter={[32, 16]} style={{ justifyContent: 'center', textAlign: 'left', margin: '40px 50px'}}>
                <Col span={12} xs={24} lg={12} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label1_title} content={data.label1_content} icon={``} color={'#158D6B'} />
                </Col>
                <Col span={12} xs={24} lg={12} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label2_title} content={data.label2_content} icon={``} color={'#158D6B'} />
                </Col>
                <Col span={6} xs={24} md={12} xl={6} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label3_title} content={data.label3_content} icon={``} color={'#006187'} /> 
                    <div style={{ paddingTop: 20 }}>
                        <BusinessModelCard type={'publicAuth'} title={data.label4_title} content={data.label4_content} icon={``} color={'#006187'} />
                    </div>            
                </Col>
                <Col span={6} xs={24} md={12} xl={6} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label5_title} content={data.label5_content} icon={``} color={'#006187'} />
                </Col>
                <Col span={6} xs={24} md={12} xl={6} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label6_title} content={data.label6_content} icon={``} color={'#006187'} />
                </Col>
                <Col span={6} xs={24} md={12} xl={6} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label7_title} content={data.label7_content} icon={``} color={'#006187'} />
                </Col>
                <Col span={12} xs={24} lg={12} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label9_title} content={data.label9_content} icon={``} color={'#259392'} />
                </Col>
                <Col span={12} xs={24} lg={12} className="business_card_public_auth" style={{ display: 'flex', flexDirection: 'column' }}>
                    <BusinessModelCard type={'publicAuth'} title={data.label10_title} content={data.label10_content} icon={``} color={'#259392'} />
                </Col>
            </Row>
        </>
    );
}

export default PublicAuthorityBusinessModel;
