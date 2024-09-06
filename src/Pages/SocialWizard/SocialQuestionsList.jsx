import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Spin, Radio, Card } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import ConfirmButton from '../../Components/WizardElements/ConfirmButton';
import { stepsLabels } from '../../Data/Data';

function SocialQuestionsList() {
    const [loading, setLoading] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const savedQuestionsData = localStorage.getItem('socialQuestionsResponse');
        if (savedQuestionsData) {
            const parsedData = JSON.parse(savedQuestionsData);
            setQuestionsData(parsedData);      
        } 
    }, []);


    const handleChange = (questionId, selectedOption) => {
        // Save the answer
        setAnswers({
            ...answers,
            [questionId]: selectedOption,
        });
        // Move to next question if available
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };


    const handleConfirmButton = () => {
        setLoading(true);
       
        setTimeout(() => {
            setIsCompleted(true);
            navigate('/impact-assessment');
        }, 3000);
    };
    
    // Get current question data
    const currentQuestion = questionsData[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
    const hasSelectedOption = answers[currentQuestion?.id] !== undefined;

    
    return (
        <Spin spinning={loading} tip="Loading...">
            <Row gutter={[32, 0]} style={{ padding: '10px 0', backgroundColor: '#FFF', marginTop: 10, borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[8].icon} 
                    subicon={stepsLabels[8].subicon} 
                    title={stepsLabels[8].title} 
                    subtitle={stepsLabels[8].subtitle}
                    level={2} 
                    color={'#00678A'}
                />
                {!isCompleted && currentQuestion && (
                    <Col span={24}>
                        <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1, textAlign: 'left' }}>
                            <div style={{ color: "rgb(0, 103, 138)", fontSize: "20px", fontWeight: "700", marginBottom: "40px"}} key={currentQuestion.id}>
                                {currentQuestion.question}
                            </div>
                            {currentQuestion.questionAnswerOptions.map((option, index) => (
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
                                        name={`question-${currentQuestion.id}`}
                                        value={option}
                                        checked={answers[currentQuestion.id] === option}
                                        onChange={() => handleChange(currentQuestion.id, option)}
                                    />
                                    <div style={{ display: 'flex', alignItems: 'end' }}>      
                                        <span style={{color:"black",marginLeft:'10px',fontWeight:'400',lineHeight:'15px',fontSize:'18px'}}>{option}</span>
                                    </div>
                                </div>
                            ))}
                            
                        </Card>
                    </Col>
                )}
                {isLastQuestion && hasSelectedOption && (
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Row style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                            <ConfirmButton
                                onClick={handleConfirmButton}
                                style={{ backgroundColor: 'black', color: '#FFF', fontSize: 15, fontWeight: 700, justifyContent: 'center' }}
                            />  
                        </Row>                       
                    </Col>   
                )}   
            </Row>
        </Spin>
    );
}

export default SocialQuestionsList;