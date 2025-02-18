import React, {useState, useEffect} from 'react';
import { Col, Radio, Card, Button, Input, Row, Checkbox ,Tooltip, message } from 'antd';
import ConfirmButton from './ConfirmButton';
import { InfoCircleOutlined } from '@ant-design/icons';
import PersonalDeviceInputCard from './PersonalDeviceInputCard';

const QuestionItem = ({ questionData, level, selectedDevicesList, formData, handleChoiceChange, handleInputChange, handleNext, handleConfirm, handleNewDevice, currentQuestionKey, handleCheckboxChange, devicesChoice, handleInputDevicesChange, inputDevicesValues }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const { text, choices, input, tabletInput, laptopInput ,tooltipQuestion } = questionData;

    const disableInput = (choices.length > 0 && !formData.choice);
    const isChoicesRequired = choices.length > 0;
    const isNextButtonDisabled = isChoicesRequired && (!formData.choice || (input && !formData.input));
    const isConfirmButtonDisabled = (!formData.input) && (formData.choice !== 'Personal Devices (Smartphones / Tablets / Laptops)');
    const isLastQuestion = (input && input.nextQuestion === 'end') || (choices.length > 0 && choices.some(choice => formData.choice === choice.text && choice.nextQuestion === 'end'));

    // DISABLE SELECTED CHOICES FOR COMMUNITY LEVEL
    const isChoiceDisabled = (choiceText) => {
        const devicesList = Array.isArray(selectedDevicesList) ? selectedDevicesList : [];
        return devicesList.some(item => item.choice === choiceText);
    };


    // VALIDATION INPUT MESSAGES
    const isSensorsInputLess75000 = (formData.choice === 'Sensors' && formData.input > 75000);
    const isDronesInputLess75 = (formData.choice === 'Drones' && formData.input > 75);
    const isCamerasInputLess3750 = (formData.choice === 'Cameras' && formData.input > 3750);
    const isRobotsInputLess3750 = (formData.choice === 'Other type of device' && formData.input > 3750);

    useEffect(() => {
        const tabletValue = inputDevicesValues.tablet !== '' ? Number(inputDevicesValues.tablet) : null;
        const laptopValue = inputDevicesValues.laptop !== '' ? Number(inputDevicesValues.laptop) : null;
        const inputValue = formData.input !== '' ? Number(formData.input) : null;

        if (currentQuestionKey === 'dev_per_type' && (formData.input === '' || formData.input === null || formData.input === undefined)) {
            setErrorMessage(null);
            return;
        }

        if(isChoicesRequired && inputValue === 0) {
            setErrorMessage('The value cannot be 0');
        } else if(/[-]/.test(formData.input)) {
            setErrorMessage('The value cannot be negative numbers');
        } else if(/[-]/.test(tabletValue)) {
            setErrorMessage('The value cannot be negative numbers');
        } else if (isSensorsInputLess75000) {
            setErrorMessage('The value must be less than 75000');
        } else if (isDronesInputLess75) {
            setErrorMessage('The value must be less than 75');
        } else if (isCamerasInputLess3750) {
            setErrorMessage('The value must be less than 3750');
        } else if (isRobotsInputLess3750) {
            setErrorMessage('The value must be less than 3750');
        } else if (devicesChoice.tablet && tabletValue !== null && tabletValue === 0) {
            setErrorMessage('The value for tablets cannot be 0');  // This only runs if tabletValue is not empty
        } else if (devicesChoice.tablet && tabletValue !== null && tabletValue < 0) {
            setErrorMessage('The value for tablets cannot be negative');
        }else if (devicesChoice.tablet && tabletValue !== null && tabletValue > 2500) {
            setErrorMessage('The value must be less than 2500');
        } else if (devicesChoice.laptop && laptopValue !== null && laptopValue === 0) {
            setErrorMessage('The value for laptops cannot be 0');
        } else if (devicesChoice.laptop && laptopValue !== null && laptopValue < 0) {
            setErrorMessage('The value for laptops cannot be negative');
        } else if (devicesChoice.laptop && laptopValue !== null && laptopValue > 2500) {
            setErrorMessage('The value must be less than 2500');
        } else {
            setErrorMessage(null);
        }
    }, [isChoicesRequired, formData.input, isSensorsInputLess75000, isDronesInputLess75, isCamerasInputLess3750, isRobotsInputLess3750, devicesChoice.tablet, inputDevicesValues.tablet, devicesChoice.laptop, inputDevicesValues.laptop, currentQuestionKey]); // Dependencies
    

    useEffect(() => {
        if (errorMessage) {
            message.error(errorMessage);
        }
    }, [errorMessage]);
    
    const invalidInput = !!errorMessage;


    return (
        <> 
            <Col span={24}>
                <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1, textAlign: 'left' }}>
                    <div style={{ color: "rgb(0, 103, 138)", fontSize: "20px", fontWeight: "700", marginBottom: "40px"}}>
                        {text}
                        {tooltipQuestion && ( // Conditionally render the Tooltip only if the `tooltip` property exists
                            <Tooltip title={tooltipQuestion}>
                                <InfoCircleOutlined style={{ marginLeft: 40, fontSize: 23, color: "#00678A" }} />
                            </Tooltip>
                        )}
                    </div>
                    {currentQuestionKey === 'personal_dev_type' ?
                        (choices && choices.map((choice, index) => (
                            <div style={{ width:'100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                padding: '8px',
                                marginBottom: '8px',
                                borderRadius: '4px',
                                backgroundColor:'rgba(234, 234, 234, 0.56)' }} key={choice.id}>
                                <Checkbox
                                    type="checkbox"
                                    checked={devicesChoice[choice.inputType]}
                                    onChange={() => handleCheckboxChange(choice.inputType)}
                                />
                                <div style={{ display: 'flex', alignItems: 'end' }}>      
                                    <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}>{choice.text}</span>
                                </div>
                            </div>
                        ))) : 
                        (choices && choices.map((choice, index) => (
                            <div style={{ width:'100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'start',
                                padding: '8px',
                                marginBottom: '8px',
                                borderRadius: '4px',
                                backgroundColor:'rgba(234, 234, 234, 0.56)' }} key={choice.id}>
                                <Tooltip
                                    key={choice.id}
                                    title={choice.tooltip}
                                    placement="top"
                                >
                                    <Radio
                                        key={index}
                                        type="radio"
                                        name="choice"
                                        value={choice.text}
                                        checked={formData.choice === choice.text}
                                        disabled={level === 'Community' && isChoiceDisabled(choice.text) && formData.choice !== choice.text}
                                        onChange={() => handleChoiceChange(choice)}
                                   />
                                 </Tooltip>                       
                                <div style={{ display: 'flex', alignItems: 'end' }}>      
                                    <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}>{choice.text}</span>
                                </div>                              
                            </div>
                        )))
                    }                  
                </Card>
            </Col>

            {input && currentQuestionKey !== 'personal_dev_type' && formData.choice !== 'Personal Devices (Smartphones / Tablets / Laptops)' && (           
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card size="small" style={{ minWidth: '40%', background: "rgba(0, 44, 60, 0.10)", textAlign: 'center', marginTop: 20, padding: '30px 0' }}>                                         
                        <Row>
                            <Col span={24}>
                                <label style={{color: "#00678A", fontSize: "20px", fontWeight: "700"}}>{input.label}</label>
                                <Input
                                    type="text"
                                    name="input"
                                    value={formData.input || ''}
                                    onChange={(e) => handleInputChange(e, 'input')}
                                    disabled={disableInput }
                                    style={{ width: "100%", margin: "20px 0", }}
                                    autoComplete='off'
                                />
                            </Col>
                        </Row> 
                        <Row style={{ justifyContent: 'center' }}>
                            <Col span={24}>
                                {!isLastQuestion && input && (
                                    <Button
                                        size="large"
                                        onClick={handleNext}
                                        disabled={isConfirmButtonDisabled || invalidInput}
                                        style={{ backgroundColor: 'black', color: '#FFF', fontSize: 15, fontWeight: 700, justifyContent: 'center' }}
                                    >
                                        Next Question
                                    </Button>
                                )}                       
                            </Col>
                        </Row>   
                    </Card>
                </Col>          
            )}
            {currentQuestionKey === 'personal_dev_type' && ( 
                <>
                    {devicesChoice.tablet && (
                        <PersonalDeviceInputCard 
                            deviceType="tablet"
                            label={tabletInput.label}
                            value={inputDevicesValues.tablet}
                            onChange={handleInputDevicesChange}
                        />
                    )}

                    {devicesChoice.laptop && (
                        <PersonalDeviceInputCard 
                            deviceType="laptop"
                            label={laptopInput.label}
                            value={inputDevicesValues.laptop}
                            onChange={handleInputDevicesChange}
                        />
                    )}
                </>
            )}   
            {(currentQuestionKey === 'personal_dev_type' || formData.choice === 'Personal Devices (Smartphones / Tablets / Laptops)') && (
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Row style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
                            <Button
                                size="large"
                                onClick={handleNext}
                                disabled={currentQuestionKey === 'personal_dev_type' ? (devicesChoice.tablet && !inputDevicesValues.tablet) || (devicesChoice.laptop && !inputDevicesValues.laptop) || invalidInput : formData.choice === 'Personal Devices (Smartphones / Tablets / Laptops)' ? false : undefined}
                                style={{ backgroundColor: 'black', color: '#FFF', fontSize: 15, fontWeight: 700, justifyContent: 'center' }}
                            >
                                Next Question
                            </Button> 
                        </Col>                  
                    </Row>                       
                </Col>  
            )}
            {isLastQuestion && (         
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Row justify="space-evenly" style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                        {level === 'Community' && selectedDevicesList.length <= 4 && 
                            <Col span={12} sm={12} xs={24} style={{marginBottom: 20}}>
                                <ConfirmButton
                                    disabled={(isChoicesRequired && isNextButtonDisabled) || (!isChoicesRequired && !formData.input)}
                                    onClick={handleNewDevice}
                                    color={'#00A27B'} 
                                    text={'Add New Device'}
                                />     
                            </Col>
                        }
                        <Col span={12} sm={12} xs={24}>
                            <ConfirmButton
                                disabled={(isChoicesRequired && isNextButtonDisabled) || (!isChoicesRequired && !formData.input)}
                                onClick={handleConfirm}
                                color={'black'} 
                                text={'Confirm Selection'}
                            />       
                        </Col>                  
                    </Row>                       
                </Col>          
            )}
        </>
    );
};

export default QuestionItem;
