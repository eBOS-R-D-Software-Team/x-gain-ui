import React, { useState, useEffect , useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row, Button, Form, Radio , Tooltip  } from 'antd';
import { stepsLabels, levels, userTypes as initialUserTypes , tooltips } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
import SubtitleForm from '../Components/WizardElements/SubtitleForm';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';

function SectorServicesLevel() {
    const navigate = useNavigate();
    const effectRan = useRef(false); // To ensure useEffect runs only once
    const [userTypes, setUserTypes] = useState(initialUserTypes);
    const [selectedLevel, setSelectedLevel] = useState();
    const [selectedUserType, setSelectedUserType] = useState(null);
    const [formData, setFormData] = useState({});
    

    useEffect(() => {
        // run one time 
        if (effectRan.current) return;
        effectRan.current = true;        
        
        
        if (localStorage.getItem('sectorsServicesLevelDetails') !== null  ){
            const sectorsServicesLevelDetailslocalstorage = JSON.parse(localStorage.getItem('sectorsServicesLevelDetails'))                  
            const level_of_assessment_localstorage_value = levels.find(a => a.text === sectorsServicesLevelDetailslocalstorage["level_of_assessment"].result) 
            console.log(sectorsServicesLevelDetailslocalstorage["level_of_assessment"].result);
            setSelectedLevel(level_of_assessment_localstorage_value.id)
            const level = levels.find(c => c.id === level_of_assessment_localstorage_value.id);
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
                isActive: userType.level_ids.includes(level_of_assessment_localstorage_value.id)
            }));
            setUserTypes(updatedUserTypes);

            setFormData(prevFormData => ({
                ...prevFormData,
                user_type_selection: {
                    type: "text", 
                    result: sectorsServicesLevelDetailslocalstorage["level_of_assessment"].result !== 'Regional' ? sectorsServicesLevelDetailslocalstorage["user_type_selection"].result : null
                }
            }));

            if(sectorsServicesLevelDetailslocalstorage["level_of_assessment"].result === 'Regional') {
                setSelectedUserType(null);
            } else {
                setSelectedUserType(sectorsServicesLevelDetailslocalstorage["user_type_selection"].result);
            }
        }
    }, [userTypes]); 


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
        const updatedUserTypes = initialUserTypes.map(userType => ({
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
        localStorage.setItem('sectorsServicesLevelDetails', JSON.stringify(formData));

        if ((selectedLevel === 1 && selectedUserType) || (selectedLevel === 2 && selectedUserType)) {
            navigate('/sector-services');
        }
        else{
            navigate('/regionalAssessment');
        }
    };
  

    return (
        <>
            <Row gutter={[32]} style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[0].icon} 
                    subicon={stepsLabels[0].subicon} 
                    title={stepsLabels[0].title} 
                    subtitle={stepsLabels[0].subtitle}
                    level={2} 
                    color={stepsLabels[0].color}
                    tooltips={tooltips.generalButton.description}
                />
                <Col span={12} xs={24} md={12}>
                    <SubtitleForm avatar={"/images/icons/level.svg"} text='Select Level of Assessment'/>
                   
                    <Form.Item style={{ borderRadius: '6px' }}>
                        {levels.map((level, index) => (
                        <Tooltip key={level.id} title={level.tooltip} placement="top">
                            <Button className="level_btn" key={level.id} type="primary" style={{ display: 'block', margin: '20px auto', backgroundColor: selectedLevel === level.id ? '#00678A' : '#B5B5B5', color: '#FFF', padding: '14px 0px', height: 'auto', fontSize: '25px', fontWeight: 700 }} onClick={() => handleLevelChange(level.id)}>
                                {level.text}
                            </Button>
                        </Tooltip>
                        ))}
                    </Form.Item>
                </Col>
                <Col span={12} xs={24} md={12}>
                    <SubtitleForm avatar={"/images/sector-icons/account-box.svg"} text='Select User Type'/>
                        
                    <div style={{ textAlign: '-webkit-center' }}>
                        {userTypes.map((type) => (
                            <Tooltip
                                key={type.id}
                                title={type.tooltip}
                                placement="top"
                            >
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
                            </Tooltip> 
                        ))}  
                    </div> 
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30, paddingTop: 20 }}>
                    <ConfirmButton disabled={( selectedLevel === 1 && !selectedUserType ) || ( selectedLevel === 2 && !selectedUserType ) || ( selectedLevel === 3 && selectedUserType ) || ( selectedLevel !== 3 && !selectedUserType ) } onClick={() => handleNextClick()} color={'black'} text={'Confirm Selection'}/>  
                </Col> 
            </Row>
        </>
    );
}

export default SectorServicesLevel;