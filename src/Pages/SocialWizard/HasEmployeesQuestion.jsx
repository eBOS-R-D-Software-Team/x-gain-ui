import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { message, Row, Col, Spin, Radio, Card } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import ConfirmButton from '../../Components/WizardElements/ConfirmButton';
import { stepsLabels } from '../../Data/Data';
import { postSocialQuestions } from '../../Data/Api';

function HasEmployeesQuestion() {
    const [loading, setLoading] = useState(false);
    const [sectorServiceData, setSectorServiceData] = useState({});
    const [value, setValue] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const savedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
        if (savedSectorServiceData?.sector?.result && savedSectorServiceData?.service?.result) {
            setSectorServiceData(savedSectorServiceData);
        } else {
            console.log("Sector or service data is incomplete or not found in localStorage.");
        }
    }, []);
    
    
    const onChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue); // Update state
    };

   
    const handleConfirmData = async () => {
        setLoading(true);
        try {
            const updatedData = {
                hasEmployees: value,
                sector: sectorServiceData.sector.result,
                service: sectorServiceData.service.result
            };
            
            localStorage.setItem('socialDetermineQuestionsRequest', JSON.stringify(updatedData));
    
            const response = await postSocialQuestions(updatedData);
    
            if (response) {
                console.log(response);
                navigate('/social-questions');
            } else {
                navigate('/impact-assessment');
            }
        } catch (error) {
            message.error("An error occurred during the submission process:", error)
        } finally {
            setLoading(false);
        }
    };
     
   
    return (
        <>
            <Spin spinning={loading} tip="Loading...">
                <Row gutter={[32, 0]} style={{ padding: '10px 0', backgroundColor: '#FFF', marginTop: 10, borderRadius: 20 }}>
                    <TitleForm 
                        icon={stepsLabels[9].icon} 
                        subicon={stepsLabels[9].subicon} 
                        title={stepsLabels[9].title} 
                        subtitle={stepsLabels[9].subtitle}
                        level={2} 
                        color={stepsLabels[9].color}
                    />
                    <Col span={24}>
                        <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1, textAlign: 'left' }}>
                            <div style={{ color: "rgb(0, 103, 138)", fontSize: "20px", fontWeight: "700", marginBottom: "40px"}}>
                                Do you employ other individuals within your business or operation?
                            </div>
                            <div style={{ width:'100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                padding: '8px',
                                marginBottom: '8px',
                                borderRadius: '4px',
                                backgroundColor:'rgba(234, 234, 234, 0.56)' }}>
                                <Radio.Group onChange={onChange} value={value}>
                                    <Radio value={true} style={{ width: '100%', marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'end' }}>      
                                            <span style={{color:"black", marginLeft:'10px', fontWeight:'400', lineHeight:'15px', fontSize:'18px'}}>Yes</span>
                                        </div>
                                    </Radio>
                                    <Radio value={false} style={{ width: '100%', marginTop: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'end' }}>      
                                            <span style={{color:"black", marginLeft:'10px', fontWeight:'400', lineHeight:'15px', fontSize:'18px'}}>No</span>
                                        </div>
                                    </Radio>
                                </Radio.Group>                                   
                            </div>                            
                        </Card>
                    </Col>
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Row style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                            <ConfirmButton
                                disabled={value === null}
                                onClick={handleConfirmData}
                                style={{ backgroundColor: 'black', color: '#FFF', fontSize: 15, fontWeight: 700, justifyContent: 'center' }}
                            />                      
                        </Row>                       
                    </Col>      
                </Row>
            </Spin>
        </>
    );
}

export default HasEmployeesQuestion;