import React from 'react';
import { Col, Radio, Card, Button, Input, Row } from 'antd';
import ConfirmButton from './ConfirmButton';

const QuestionItem = ({ questionData, formData, handleChoiceChange, handleInputChange, handleNext, handleConfirm }) => {
    const { text, choices, input } = questionData;

    const disableInput = (choices.length > 0 && !formData.choice);
    const isChoicesRequired = choices.length > 0;
    const isNextButtonDisabled = isChoicesRequired && (!formData.choice || (input && !formData.input));
    const isConfirmButtonDisabled = (!formData.input);
    const isLastQuestion = (input && input.nextQuestion === 'end') || (choices.length > 0 && choices.some(choice => formData.choice === choice.text && choice.nextQuestion === 'end'));

    return (
        <>
            <Col span={24}>
                <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1, textAlign: 'left' }}>
                    <div style={{ color: "rgb(0, 103, 138)", fontSize: "20px", fontWeight: "700", marginBottom: "40px"}}>
                        {text}
                    </div>
                    {choices && choices.map(choice => (
                        <div style={{ width:'100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            padding: '8px',
                            marginBottom: '8px',
                            borderRadius: '4px',
                            backgroundColor:'rgba(234, 234, 234, 0.56)' }} key={choice.id}>
                            <Radio
                                type="radio"
                                name="choice"
                                value={choice.text}
                                checked={formData.choice === choice.text}
                                onChange={() => handleChoiceChange(choice)}
                            />
                            <div style={{ display: 'flex', alignItems: 'end' }}>      
                                <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}>{choice.text}</span>
                            </div>
                        </div>
                    ))}
                    
                </Card>
            </Col>

            {input && (           
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Card size="small" style={{ background: "rgba(0, 44, 60, 0.10)", textAlign: 'center', marginTop: 20, padding: '30px 0' }}>                    
                        <Row>
                            <Col span={24}>
                                <label style={{color: "#00678A", fontSize: "20px", fontWeight: "700"}}>{input.label}</label>
                                <Input
                                    type="text"
                                    name="input"
                                    value={formData.input || ''}
                                    onChange={handleInputChange}
                                    disabled={disableInput}
                                    style={{ width: "100%", margin: "20px 0", }}
                                />
                            </Col>
                        </Row>    
                        <Row style={{ justifyContent: 'center' }}>
                            <Col span={8}>
                                {!isLastQuestion && input && (
                                    <Button
                                      size="large"
                                      onClick={handleNext}
                                      disabled={isConfirmButtonDisabled}
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
            {isLastQuestion && (         
                <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Row style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                        <ConfirmButton
                          disabled={(isChoicesRequired && isNextButtonDisabled) || (!isChoicesRequired && !formData.input)}
                          onClick={handleConfirm}
                          style={{ backgroundColor: 'black', color: '#FFF', fontSize: 15, fontWeight: 700, justifyContent: 'center' }}
                        />                      
                    </Row>                       
                </Col>          
            )}
        </>
    );
};

export default QuestionItem;
