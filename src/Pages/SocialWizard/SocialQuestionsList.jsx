import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Spin, message } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import ConfirmButton from '../../Components/WizardElements/ConfirmButton';
import { stepsLabels } from '../../Data/Data';
import SocialQuestionItem from '../../Components/WizardElements/SocialQuestionItem';
import { postSolutionsAnalysis, postSocialAnswers, postEnvironmentalData } from '../../Data/Api';

function SocialQuestionsList() {
    const [loading, setLoading] = useState(false);
    const [iccsResponseData, setIccsResponseData] = useState({});
    const [questionsData, setQuestionsData] = useState([]);
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [dataCalculateSocialScore, setDataCalculateSocialScore] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const savedQuestionsData = localStorage.getItem('socialQuestionsResponse');
        if (savedQuestionsData) {
            const parsedData = JSON.parse(savedQuestionsData);
            setQuestionsData(parsedData);      
        }
    }, []);


    useEffect(() => {
        const data = localStorage.getItem('iccs_response');
        if (data) {
            const parsedData = JSON.parse(data);
            setIccsResponseData(parsedData);      
        }
    }, []);


    const handleChange = (questionId, selectedOption) => {
        // Save the answer
        setAnswers({
            ...answers,
            [questionId]: selectedOption,
        });

        // Save the question, ID, and selected answer into the array
        const question = questionsData.find(q => q.id === questionId);
        const newResponse = {
            id: question.id,
            question: question.question,
            questionAnswer: selectedOption,
        };

        setDataCalculateSocialScore((prevResponses) => {
            const updatedResponses = [...prevResponses];
            const existingIndex = updatedResponses.findIndex(res => res.questionId === questionId);

            // Replace the answer if the question already exists, otherwise add new entry
            if (existingIndex >= 0) {
                updatedResponses[existingIndex] = newResponse;
            } else {
                updatedResponses.push(newResponse);
            }
            return updatedResponses;
        });

        // Move to next question if available
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };


    const handleConfirmButton = async () => {
        try {
            setLoading(true);
        
            // Simulate a delay if required for UX purposes
            await new Promise((resolve) => setTimeout(resolve, 3000));
            setIsCompleted(true);
            await postSolutionsAnalysis();
            await postSocialAnswers(dataCalculateSocialScore);
            await postEnvironmentalData(iccsResponseData);
            navigate('/impact-assessment');
        } catch (error) {
            message.error("An error occurred during the submission process:", error)
        } finally {
            setLoading(false);
        }
    };
    
    const currentQuestion = questionsData[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
    const hasSelectedOption = answers[currentQuestion?.id] !== undefined;

    
    return (
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
                {!isCompleted && currentQuestion && (
                    <SocialQuestionItem 
                        questionId={currentQuestion.id}
                        questionText={currentQuestion.question}
                        items={currentQuestion.questionAnswerOptions}
                        selectedValue={answers[currentQuestion.id]}
                        onChange={handleChange} 
                    />
                )}
                {isLastQuestion && hasSelectedOption && (
                    <Col span={24} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Row style={{ textAlign: 'left', marginTop: 20, padding: '30px 0' }}>
                            <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
                                <ConfirmButton
                                    disabled={false}
                                    onClick={handleConfirmButton}
                                    color={'black'} 
                                    text={'Confirm Selection'}
                                />       
                            </Col> 
                        </Row>                       
                    </Col>   
                )}   
            </Row>
        </Spin>
    );
}

export default SocialQuestionsList;