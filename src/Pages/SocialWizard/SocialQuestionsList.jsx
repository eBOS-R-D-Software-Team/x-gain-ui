import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Spin, message } from 'antd';
import TitleForm from '../../Components/WizardElements/TitleForm';
import ConfirmButton from '../../Components/WizardElements/ConfirmButton';
import { stepsLabels ,socialquestiotooltips} from '../../Data/Data';
import SocialQuestionItem from '../../Components/WizardElements/SocialQuestionItem';
import { postSolutionsAnalysis, postSocialAnswers, postEnvironmentalData } from '../../Data/Api';
import { useBackButton } from '../../Context/BackButtonContext';

function SocialQuestionsList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { indexQuestion, isUpload } = location.state || {};
    const { setBackAction } = useBackButton();

    const getAnswers = JSON.parse(localStorage.getItem('answers'));
    const getDataCalculateScore = JSON.parse(localStorage.getItem('dataCalculateSocialScore'));

    const [loading, setLoading] = useState(false);
    const [iccsResponseData] = useState(() => JSON.parse(localStorage.getItem('iccs_response')) || {});
    const [questionsData] = useState(() => JSON.parse(localStorage.getItem('socialQuestionsResponse')) || []);
    const [answers, setAnswers] = useState(isUpload ? getAnswers : {});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(isUpload ? parseInt(indexQuestion) : 0);
    const [dataCalculateSocialScore, setDataCalculateSocialScore] = useState(isUpload ? getDataCalculateScore : []);
    const [isCompleted, setIsCompleted] = useState(false);

    // Clear location state after upload processing
    useEffect(() => {
        if (isUpload) {
            navigate(location.pathname, { replace: true });
        }
    }, [isUpload, location.pathname, navigate]);


    // Update local storage when answers or score data changes
    useEffect(() => {
        localStorage.setItem('answers', JSON.stringify(answers));
        localStorage.setItem('dataCalculateSocialScore', JSON.stringify(dataCalculateSocialScore));
    }, [answers, dataCalculateSocialScore]);


    useEffect(() => {
        localStorage.setItem('currentQuestionIndexSocialQuestion', currentQuestionIndex);
    }, [currentQuestionIndex]);


    // Set back button behavior and cleanup on unmount
    useEffect(() => {
         // Function to handle going back to previous question
        const handleBackPreviousQuestion = () => {
            if (currentQuestionIndex > 0) {
                const prevQuestionID = questionsData[currentQuestionIndex - 1].id;
                const currentQuestionID = questionsData[currentQuestionIndex].id;

                setAnswers(prevAnswers => {
                    const updatedAnswers = { ...prevAnswers };
                    delete updatedAnswers[prevQuestionID];
                    if (currentQuestionIndex === questionsData.length - 1) delete updatedAnswers[currentQuestionID];
                    return updatedAnswers;
                });

                setDataCalculateSocialScore(prevResponses => {
                    let updatedResponses = prevResponses.filter(response => response.id !== prevQuestionID);
                    if (currentQuestionIndex === questionsData.length - 1) {
                        updatedResponses = updatedResponses.filter(response => response.id !== currentQuestionID);
                    }
                    return updatedResponses;
                });

                setCurrentQuestionIndex(currentQuestionIndex - 1);
            } else {
                navigate(-1);
            }
        };

        setBackAction(() => handleBackPreviousQuestion);

        return () => setBackAction(null);
    }, [setBackAction, dataCalculateSocialScore, currentQuestionIndex, navigate, questionsData]);


    // Handle answer selection and moving to the next question
    const handleChange = (questionId, selectedOption) => {
        const question = questionsData.find(q => q.id === questionId);
        const newResponse = {
            id: question.id,
            question: question.question,
            questionAnswer: selectedOption,
        };

        setAnswers(prev => ({
            ...prev,
            [questionId]: selectedOption
        }));

        setDataCalculateSocialScore(prevResponses => {
            const updatedResponses = [...prevResponses];
            const existingIndex = updatedResponses.findIndex(res => res.id === questionId);

            if (existingIndex >= 0) {
                updatedResponses[existingIndex] = newResponse;
            } else {
                updatedResponses.push(newResponse);
            }

            return updatedResponses;
        });

        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Handle confirmation of answers and submission
    const handleConfirmButton = async () => {
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
            setIsCompleted(true);
            await postSolutionsAnalysis();
            await postSocialAnswers(dataCalculateSocialScore);
            await postEnvironmentalData(iccsResponseData);
            navigate('/impact-assessment');
        } catch (error) {
            message.error("An error occurred during the submission process");
            localStorage.removeItem('iccs_response');
            localStorage.removeItem('solutionsAnalysisResponse');
        } finally {
            setLoading(false);
        }
    };

    const matchedQuestions = questionsData.map((item) => {
        // Get the key from the JSON structure that corresponds to the ID       
        const keys = Object.keys(socialquestiotooltips);
        const key = keys[item.id - 1]; // Assuming IDs align with order
       
        const description = socialquestiotooltips[key]?.description || "No description available";
       
        return {
          ...item,
          description
        };
    });
    console.log('matchedQuestions' , matchedQuestions);
    const questionID = questionsData[currentQuestionIndex].id;
    // Find the description for the given ID
    const descriptionSocialQuestion = matchedQuestions.find(item => item.id === questionID)?.description;
    console.log('descriptionSocialQuestion' , descriptionSocialQuestion);
    const currentQuestion = questionsData[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
    const hasSelectedOption = answers[currentQuestion?.id] !== undefined;
    //console.log('key' , key);
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
                        tooltips={descriptionSocialQuestion}
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
