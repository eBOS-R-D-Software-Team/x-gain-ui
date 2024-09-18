import React from 'react';
import { Row, Col, Card } from 'antd';
import { renderBulletedList } from '../../../HelperFunctions';
import BusinessModelCard from '../../../Components/ResultsElements/BusinessModelCard';

const PublicAuthorityBusinessModel = ({data}) => { 
    return (
        <>          
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
