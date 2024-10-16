import React, { useState, useEffect , useRef } from 'react';
import { useNavigate , useLocation } from "react-router-dom";
import { message, Row, Spin } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels, questions } from '../Data/Data';
import QuestionItem from '../Components/WizardElements/QuestionItem';
import { postDataToICCSApi } from '../Data/Api';
import { initQuestionsData } from '../Data/JsonObjects';
import { useBackButton } from '../Context/BackButtonContext';

function QuestionsList() {
    const navigate = useNavigate();
    const [currentQuestionKey, setCurrentQuestionKey] = useState('dev_per_type');
    const [formData, setFormData] = useState({
        initData: initQuestionsData,
        data: {}
    });
    const [nextQuestionKey, setNextQuestionKey] = useState(null); // State to handle navigation
    const [loading, setLoading] = useState(false);
    const [devicesChoice, setDevicesChoice] = useState({
        tablet: false,
        laptop: false
    });
    const [inputDevicesValues, setInputDevicesValues] = useState({
        tablet: '',
        laptop: ''
    });

    const location = useLocation();
    const { questionsId } = location.state || {};
    const [localQuestionsId, setLocalQuestionsId] = useState(questionsId);      
    const { setBackAction } = useBackButton(); // Access the function to set the back action
    
    useEffect(() => {
        localStorage.setItem('questionsFormData', JSON.stringify(formData.initData));
        localStorage.setItem('DataQuestionUploadButton', JSON.stringify(formData.data)); 
        
        const lastkey = localStorage.getItem('lastKey');
        console.log(lastkey);
        if (lastkey){
            setCurrentQuestionKey(lastkey)
            localStorage.removeItem('lastKey');
            console.log('fffffff')    

        }
        
    }, [formData ]);

    // Effect to handle navigation after form data is updated
    useEffect(() => {
        if (nextQuestionKey && nextQuestionKey !== 'end') {
            setCurrentQuestionKey(nextQuestionKey);
        }   
    }, [nextQuestionKey]);

    useEffect(() => {
        if (localQuestionsId) {
          setCurrentQuestionKey(localQuestionsId); // Use the questionsId
          setLocalQuestionsId(null); // Reset the local state to null or an empty value
        }
    }, [localQuestionsId]);

    useEffect(() => { 
        setBackAction(() => handleBackPreviousQuestion); 
      
        // Optional: Reset back action when the component is unmounted
        return () => setBackAction(null);
    }, [setBackAction ,formData]);
      
    const handleChoiceChange = (choice) => {
        const nextQuestion = choice.nextQuestion;

        setFormData(prevFormData => ({
            ...prevFormData,
            initData: {
                ...prevFormData.initData,
                [currentQuestionKey]: {
                    ...prevFormData.initData[currentQuestionKey],
                    type: "string",
                    choice: choice.text,
                    result: questions[currentQuestionKey].choices.map(c => c.text === choice.text ? 1 : 0)
                }
            },
            data: {
                ...prevFormData.data,
                [currentQuestionKey]: {
                    ...prevFormData.data[currentQuestionKey],
                    type: "string",
                    choice: choice.text,
                    result: questions[currentQuestionKey].choices.map(c => c.text === choice.text ? 1 : 0)
                }
            }
        }));

        // Automatically proceed if there is no input field and nextQuestion is defined, but do not navigate to 'end'
        if (!questions[currentQuestionKey].input && nextQuestion && nextQuestion !== 'end') {
            setNextQuestionKey(nextQuestion);      
            setCurrentQuestionKey(nextQuestion); // Update the current question       
     
        }
    };

    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData(prevFormData => {
            let updatedResult;

            // Initialize updatedResult based on the current question type
            if (currentQuestionKey === 'robot_cost' || currentQuestionKey === 'robot_power') {
                updatedResult = parseInt(value, 10) || 0;
            }  else if (currentQuestionKey === 'robot_type') {
                updatedResult = value.toString();
            } else {
                // For other questions, ensure result is an array and handle updates
                // Save 1 value to selected choice
                updatedResult = prevFormData.initData[currentQuestionKey] && Array.isArray(prevFormData.initData[currentQuestionKey].result)
                    ? [...prevFormData.initData[currentQuestionKey].result]
                    : [value];
                
                //Save input value to choice position
                if (currentQuestionKey === 'dev_per_type') {
                    const choiceIndex = questions[currentQuestionKey].choices.findIndex(c => c.text === prevFormData.initData[currentQuestionKey]?.choice);
                    if (choiceIndex !== -1 && choiceIndex !== 2) {
                        updatedResult[choiceIndex] = value;
                    }
                }
            }
  
            const updatedFormData = {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    [currentQuestionKey]: {
                        ...prevFormData.initData[currentQuestionKey],
                        type: "string",
                        input: value,
                        result: updatedResult
                    }
                },
                data: {
                    ...prevFormData.data,
                    [currentQuestionKey]: {
                        ...prevFormData.data[currentQuestionKey],
                        type: "string",
                        input: value,
                        result: updatedResult
                    }
                }
            };
    
            return updatedFormData;
        });
    };


    // Handle checkbox change
    const handleCheckboxChange = (inputType) => {
        setDevicesChoice((prevState) => ({
            ...prevState,
            [inputType]: !prevState[inputType],
        }));
    };


    // Handle input change
    const handleInputDevicesChange = (event, deviceType) => {
        const value = event.target.value;
        setInputDevicesValues((prevState) => ({
            ...prevState,
            [deviceType]: value
        }));

        // Update formData result accordingly
        setFormData((prevState) => {
            const updatedResult = [...prevState.initData[currentQuestionKey].result];
            
            if (deviceType === 'tablet') {
                updatedResult[0] = parseInt(value) || 0; // Update tablet count
            } else if (deviceType === 'laptop') {
                updatedResult[1] = parseInt(value) || 0; // Update laptop count
            }

            return {
                ...prevState,
                initData: {
                    ...prevState.initData,
                    [currentQuestionKey]: {
                        ...prevState.initData[currentQuestionKey],
                        result: updatedResult
                    }
                },
                data: {
                    ...prevState.data,
                    [currentQuestionKey]: {
                        ...prevState.data[currentQuestionKey],
                        result: updatedResult
                    }
                }
            };
        });
    };

    // Check if both checkboxes are selected
    const selectedBothDevices = devicesChoice.tablet && devicesChoice.laptop;
    

    const handleNextQuestion = () => {
        const currentQuestion = questions[currentQuestionKey];
        let nextQuestion;
        //Navigate steps after form data is updated
        if (currentQuestionKey === 'dev_per_type') {
            const choice = questions[currentQuestionKey].choices.find(c => c.text === formData.initData[currentQuestionKey]?.choice);
            nextQuestion = choice?.nextQuestion;
        } else if (currentQuestionKey === 'personal_dev_type') {
            if(selectedBothDevices) {
                nextQuestion = "personal_internet";
            } else if(devicesChoice.tablet) {
                nextQuestion = "tablet_internet";
            } else if(devicesChoice.laptop) {
                nextQuestion = "laptop_internet";
            }
        } else if (currentQuestion.input) {
            nextQuestion = currentQuestion.input.nextQuestion;
        } else {
            const choice = currentQuestion.choices.find(c => c.text === formData.initData[currentQuestionKey]?.choice);
            nextQuestion = choice?.nextQuestion;
        }  

        if (nextQuestion) {
            setNextQuestionKey(nextQuestion);    
            setCurrentQuestionKey(nextQuestion); // Update the current question       
        }
        
    };

    const handleBackPreviousQuestion = () => { 
        const currentQuestion = questions[currentQuestionKey];      
        const  keysArray = Object.keys(formData.data); // Get all keys
        const  prevKey = keysArray[keysArray.length - 1]; // Find the last key

        if (formData.data && Object.keys(formData.data).length > 0) {

            if (keysArray.length > 0) {
                // Remove the last key from the data object
                const updatedData = { ...formData.data };
                delete updatedData[prevKey];
    
                // Reset the specific key to the initial value from initQuestionsData
                const updatedInitData = {
                    ...formData.initData,
                    [prevKey]: initQuestionsData[prevKey],
                };
               
                // Update state sequentially
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    initData: updatedInitData,
                    data: updatedData,
                }));

                // Handle resetting devices choice if needed
                if (prevKey === 'personal_dev_type' || currentQuestionKey === 'personal_dev_type') {
                    setDevicesChoice({
                        tablet: false,
                        laptop: false
                    });
                    setInputDevicesValues({
                        tablet: '',
                        laptop: ''
                    });
                } 
    
                setCurrentQuestionKey(prevKey); // Move to the previous question key
            }
        } else {
            navigate(-1); // Navigate back if no data is present
        }
     } 

    const handleConfirmData = async () => {
        setLoading(true);
        try {
            // Save the form data and set the next question key
            setFormData(
                prevFormData => {
                    const updatedFormData = { 
                        ...prevFormData,
                        initData: {
                            ...prevFormData.initData,
                        },
                        data: {
                            ...prevFormData.data,
                        } 
                    };
                    localStorage.setItem('questionsFormData', JSON.stringify(updatedFormData.initData));
                    localStorage.setItem('DataQuestionUploadButton', JSON.stringify(updatedFormData.data));
                    localStorage.setItem('completeQuestionsFormData', JSON.stringify(updatedFormData.initData));                    
                    setNextQuestionKey('end');
                    return updatedFormData;
                }
            );
    
            const response = await postDataToICCSApi();
    
            if (response) {
                navigate('/has-employee');
            } else {
                console.error("Failed to submit data to ICCS API.");
                message.error("Failed to submit data to ICCS API.")
            }
        } catch (error) {
            console.error("An error occurred during the submission process:", error);
            message.error("An error occurred during the submission process:", error)
        } finally {
            setLoading(false);
        }
    };
     
    const currentQuestionData = questions[currentQuestionKey];
   
    
    return (
        <>
            <Spin spinning={loading} tip="Loading...">
                <Row gutter={[32, 0]} style={{ padding: '10px 0', backgroundColor: '#FFF', marginTop: 10, borderRadius: 20 }}>
                    <TitleForm 
                        icon={stepsLabels[3].icon} 
                        subicon={stepsLabels[3].subicon} 
                        title={stepsLabels[3].title} 
                        subtitle={stepsLabels[3].subtitle}
                        level={2} 
                        color={stepsLabels[3].color}
                    />
                    <QuestionItem
                        questionData={currentQuestionData}
                        formData={formData.initData[currentQuestionKey] || {}}
                        handleChoiceChange={handleChoiceChange}
                        handleInputChange={handleInputChange}
                        handleNext={handleNextQuestion}
                        handleConfirm={handleConfirmData}
                        currentQuestionKey={currentQuestionKey}
                        handleCheckboxChange={handleCheckboxChange}
                        devicesChoice={devicesChoice}
                        handleInputDevicesChange={handleInputDevicesChange}
                        inputDevicesValues={inputDevicesValues}
                    />
                </Row>
            </Spin>
        </>
    );
}

export default QuestionsList;