import React from 'react';
import { Col, Radio, Card, Button, Input, Row } from 'antd';
import ConfirmButton from './ConfirmButton';

const SocialQuestionItem = ({ questionId, questionText, items, selectedValue, onChange }) => {
    return (
        <Col span={24}>
            <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1, textAlign: 'left' }}>
                <div style={{ color: "rgb(0, 103, 138)", fontSize: "20px", fontWeight: "700", marginBottom: "40px"}} key={questionId}>
                    {questionText}
                </div>
                {items.map((option, index) => (
                    <div style={{ width:'100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        padding: '8px',
                        marginBottom: '8px',
                        borderRadius: '4px',
                        backgroundColor:'rgba(234, 234, 234, 0.56)' }} key={index}>
                        <Radio
                            type="radio"
                            name={`question-${questionId}`}
                            value={option}
                            checked={selectedValue === option}
                            onChange={() => onChange(questionId, option)}
                        />
                        <div style={{ display: 'flex', alignItems: 'end' }}>      
                            <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}>{option}</span>
                        </div>
                    </div>
                ))}               
            </Card>
        </Col>
    );
};

export default SocialQuestionItem;
