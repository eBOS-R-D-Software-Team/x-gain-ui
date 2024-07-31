import React, { useState } from 'react';
import { Col, Row, Button, Form, Radio } from 'antd';
import { stepsLabels, levels, userTypes as initialUserTypes } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
import SubtitleForm from '../Components/WizardElements/SubtitleForm';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';


function SectorServicesLevel() {
    const [form] = Form.useForm();

    const [userTypes, setUserTypes] = useState(initialUserTypes);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedUserTypeId, setSelectedUserTypeId] = useState(null);

   
    const updateUserTypesBasedOnLevel = (selectedLevelId) => {
        setSelectedLevel(selectedLevelId);
        setSelectedUserTypeId(null); // Reset selected user type

        const updatedUserTypes = userTypes.map(userType => ({
            ...userType,
            isActive: userType.level_ids.includes(selectedLevelId)
        }));
        setUserTypes(updatedUserTypes);
    };

    const handleUserTypeClick = (userTypeId) => {
        console.log(userTypeId);
        setSelectedUserTypeId(userTypeId);
    };
  

    return (
        <>
            <Form form={form}>
                <Row gutter={[32]} style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                    <TitleForm avatar={"/images/icons/sector.svg"} text={stepsLabels[0].title}/>
                    <Col span={12} xs={24} md={12}>
                        <SubtitleForm avatar={"/images/icons/level.svg"} text='Select Level of Assessment'/>
                     
                        <Form.Item style={{ borderRadius: '6px' }}>
                            {levels.map((level, index) => (
                                <Button className="level_btn" key={level.id} type="primary" style={{ display: 'block', margin: '20px auto', backgroundColor: selectedLevel === level.id ? '#00678A' : '#B5B5B5', color: '#FFF', padding: '14px 0px', height: 'auto', fontSize: '25px', fontWeight: 700 }} onClick={() => updateUserTypesBasedOnLevel(level.id)}>
                                    {level.text}
                                </Button>
                            ))}
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={24} md={12}>
                        <SubtitleForm avatar={"/images/sector-icons/account-box.svg"} text='Select User Type'/>
                         
                        <div style={{ textAlign: '-webkit-center' }}>
                            {userTypes.map((type) => (
                                <div
                                    style={{
                                        width:'80%',
                                        display: 'flex',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        marginBottom: '8px',
                                        borderRadius: '4px',
                                        backgroundColor:'rgba(234, 234, 234, 0.56)'
                                    }}
                                    key={type.id}
                                    >
                                    <Radio checked={selectedUserTypeId === type.id} onChange={() => handleUserTypeClick(type.id)}  disabled={!type.isActive} />
                                    <div style={{ display: 'flex', alignItems: 'end' }}>                           
                                        <span style={{color:"black",marginLeft:'10px',fontWeight:'600',lineHeight:'15px',fontSize:'18px'}}>{type.text}</span>
                                    </div>                       
                                </div>        
                            ))}  
                        </div> 
                    </Col>
                    <ConfirmButton disabled={!selectedLevel || !selectedUserTypeId} onClick={() => console.log('Next button clicked!')} /> 
                    
                </Row>
            </Form>
        </>
    );
}

export default SectorServicesLevel;