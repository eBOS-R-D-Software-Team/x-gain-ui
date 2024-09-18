import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Form, Radio } from 'antd';
import { stepsLabels, levels, userTypes as initialUserTypes } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
import SubtitleForm from '../Components/WizardElements/SubtitleForm';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';


function SectorServicesLevel() {
    const navigate = useNavigate();

    const [userTypes, setUserTypes] = useState(initialUserTypes);
    const [selectedLevel, setSelectedLevel] = useState(0);
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [formData, setFormData] = useState({});
    

    const handleLevelChange = (selectedLevelId) => {
        setSelectedLevel(selectedLevelId);

        const level = levels.find(c => c.id === selectedLevelId);
        setFormData(prevFormData => ({
            ...prevFormData,
            level_of_assessment: {
                type: "text", 
                result: level.text
            }
        }));

        setSelectedUserType(null); // Reset selected user type

        //Enable user types based on level selection
        const updatedUserTypes = userTypes.map(userType => ({
            ...userType,
            isActive: userType.level_ids.includes(selectedLevelId)
        }));
        setUserTypes(updatedUserTypes);
    };


    const handleUserTypeChange = (userTypeText) => {
        setSelectedUserType(userTypeText);

        setFormData(prevFormData => ({
            ...prevFormData,
            user_type_selection: {
                type: "text", 
                result: userTypeText
            }
        }));
    };


    const handleNextClick = () => {    
        if (selectedLevel && selectedUserType) {
            localStorage.setItem('sectorsServicesLevelDetails', JSON.stringify(formData));
            navigate('/sector-services');
        }
    };
  

    return (
        <>
            <Row gutter={[32]} style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[1].icon} 
                    subicon={stepsLabels[1].subicon} 
                    title={stepsLabels[1].title} 
                    subtitle={stepsLabels[1].subtitle}
                    level={2} 
                    color={stepsLabels[1].color}
                />
                <Col span={12} xs={24} md={12}>
                    <SubtitleForm avatar={"/images/icons/level.svg"} text='Select Level of Assessment'/>
                    
                    <Form.Item style={{ borderRadius: '6px' }}>
                        {levels.map((level, index) => (
                            <Button className="level_btn" key={level.id} type="primary" style={{ display: 'block', margin: '20px auto', backgroundColor: selectedLevel === level.id ? '#00678A' : '#B5B5B5', color: '#FFF', padding: '14px 0px', height: 'auto', fontSize: '25px', fontWeight: 700 }} onClick={() => handleLevelChange(level.id)}>
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
                                <Radio checked={selectedUserType === type.text} onChange={() => handleUserTypeChange(type.text)}  disabled={!type.isActive} />
                                <div style={{ display: 'flex', alignItems: 'end' }}>                           
                                    <span style={{color:"black",marginLeft:'10px',fontWeight:'600',lineHeight:'15px',fontSize:'18px'}}>{type.text}</span>
                                </div>                       
                            </div>        
                        ))}  
                    </div> 
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
                    <ConfirmButton disabled={!selectedLevel || !selectedUserType} onClick={() => handleNextClick()} color={'black'} text={'Confirm Selection'}/>  
                </Col> 
            </Row>
        </>
    );
}

export default SectorServicesLevel;