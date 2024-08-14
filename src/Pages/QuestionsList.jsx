import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels, questions } from '../Data/Data';
import QuestionItem from '../Components/WizardElements/QuestionItem';

function QuestionsList() {
    const [currentQuestionKey, setCurrentQuestionKey] = useState('dev_per_type');
    const [formData, setFormData] = useState({});
    const [nextQuestionKey, setNextQuestionKey] = useState(null); // State to handle navigation

    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem('questionsFormData', JSON.stringify(formData));
        console.log('lovely', formData);
    }, [formData]);

    // Effect to handle navigation after form data is updated
    useEffect(() => {
        if (nextQuestionKey && nextQuestionKey !== 'end') {
            setCurrentQuestionKey(nextQuestionKey);
        }   
    }, [nextQuestionKey]);


    const handleChoiceChange = (choice) => {
        const nextQuestion = choice.nextQuestion;

        setFormData(prevFormData => ({
            ...prevFormData,
            [currentQuestionKey]: {
                ...prevFormData[currentQuestionKey],
                type: "string",
                choice: choice.text,
                result: questions[currentQuestionKey].choices.map(c => c.text === choice.text ? 1 : 0)
            }
        }));

        // Automatically proceed if there is no input field and nextQuestion is defined, but do not navigate to 'end'
        if (!questions[currentQuestionKey].input && nextQuestion && nextQuestion !== 'end') {
            setNextQuestionKey(nextQuestion);
        }
    };

    
    const handleInputChange = (e) => {
        const value = e.target.value;

        setFormData(prevFormData => {
            //Save 1 value to selected choice
            const updatedResult = prevFormData[currentQuestionKey] && prevFormData[currentQuestionKey].result
                ? [...prevFormData[currentQuestionKey].result]
                : [value];

            //Save input value to choice position
            if (currentQuestionKey === 'dev_per_type' || currentQuestionKey === 'personal_dev_type') {
                const choiceIndex = questions[currentQuestionKey].choices.findIndex(c => c.text === prevFormData[currentQuestionKey].choice);
                if (choiceIndex !== -1) {
                    updatedResult[choiceIndex] = value;
                }
            }
  
            const updatedFormData = {
                ...prevFormData,
                [currentQuestionKey]: {
                    ...prevFormData[currentQuestionKey],
                    type: "string",
                    input: value,
                    result: updatedResult
                }
            };
    
            return updatedFormData;
        });
    };
    

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionKey];
        let nextQuestion;
    
        //Navigate steps after form data is updated
        if (currentQuestionKey === 'dev_per_type' || currentQuestionKey === 'personal_dev_type') {
            const choice = questions[currentQuestionKey].choices.find(c => c.text === formData[currentQuestionKey]?.choice);
            nextQuestion = choice?.nextQuestion;
        } else if (currentQuestion.input) {
            nextQuestion = currentQuestion.input.nextQuestion;
        } else {
            const choice = currentQuestion.choices.find(c => c.text === formData[currentQuestionKey]?.choice);
            nextQuestion = choice?.nextQuestion;
        }

        if (nextQuestion) {
            setNextQuestionKey(nextQuestion);
        }
    };


    const handleConfirmData = () => {
        setFormData(prevFormData => {
            const updatedFormData = { ...prevFormData };
            localStorage.setItem('wizardFormData', JSON.stringify(updatedFormData));
            setNextQuestionKey('end');
            return updatedFormData;
        });

        //Delay navigation to after state has been updated
        setTimeout(() => {
            navigate('/impact-assessment');
        }, 0);
    };
     
    const currentQuestionData = questions[currentQuestionKey];
   
    return (
        <>
            <Row gutter={[32, 0]} style={{ padding: '10px 0', backgroundColor: '#FFF', marginTop: 10, borderRadius: 20 }}>
                <TitleForm avatar={"/images/sector-icons/service.svg"} text={stepsLabels[2].title}/>
                <QuestionItem
                    questionData={currentQuestionData}
                    formData={formData[currentQuestionKey] || {}}
                    handleChoiceChange={handleChoiceChange}
                    handleInputChange={handleInputChange}
                    handleNext={handleNextQuestion}
                    handleConfirm={handleConfirmData}
                />
            </Row>
        </>
    );
}

export default QuestionsList;