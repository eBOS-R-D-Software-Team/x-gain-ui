import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation } from "react-router-dom";
import { message, Row, Spin } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels, questions , tooltips } from '../Data/Data';
import QuestionItem from '../Components/WizardElements/QuestionItem';
import { postDataToICCSApi } from '../Data/Api';
import { initQuestionsData } from '../Data/JsonObjects';
import { useBackButton } from '../Context/BackButtonContext';
import { mergeDevicesData, updateDevicesInStorage } from '../HelperFunctions';

function QuestionsList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { lastKeyResult , isUpload , lastkey } = location.state || {};      
    const { setBackAction } = useBackButton(); // Access the function to set the back action  
    let savedInitDataQuestions ;
    let uploadDataQuestionButton;
    if (isUpload){
        savedInitDataQuestions = localStorage.getItem('questionsFormData');
        uploadDataQuestionButton = localStorage.getItem('DataQuestionUploadButton');
    }
    const [currentQuestionKey, setCurrentQuestionKey] = useState('dev_per_type');
    const [formData, setFormData] = useState({
        initData: isUpload ? JSON.parse(savedInitDataQuestions) : initQuestionsData,
        data: isUpload ? JSON.parse(uploadDataQuestionButton) : {}
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
    const [count, setCount] = useState(0);
    const [newDevicesPerType, setNewDevicesPerType] = useState({});
    const [selectedLevel, setSelectedLevel] = useState('');

    
    useEffect(() => {
        const storedDetails = localStorage.getItem('sectorsServicesLevelDetails');
        if (storedDetails) {
            try {
                const parsedDetails = JSON.parse(storedDetails);
                const level = parsedDetails?.level_of_assessment?.result || '';
                setSelectedLevel(level);
            } catch (error) {
                console.error('Failed to parse sectorsServicesLevelDetails:', error);
            }
        } else {
            console.warn('No sectorsServicesLevelDetails found in localStorage');
        }
    }, []);

    
    // Save formData to localStorage whenever it changes
    useEffect(() => {
        try {
        localStorage.setItem('questionsFormData', JSON.stringify(formData.initData));
        localStorage.setItem('DataQuestionUploadButton', JSON.stringify(formData.data));
        
        } catch (error) {
        console.error('Error saving data to localStorage:', error);
        }
        console.log(formData.data)
    }, [formData]); // This will run whenever formData changes   


    useEffect(() => {
        localStorage.removeItem('devices');
    }, []);
    

    // Effect that runs when the user clicks the upload button and conditions are met
    useEffect(() => {
        if (lastkey && questions && questions[lastkey] && isUpload) {
            const currentQuestion = questions[lastkey];    
            const foundItem = questions[lastkey];
            const arrayItemChoices = foundItem.choices; 
            let findEndQuestion;               

            if (foundItem.input){
                findEndQuestion = foundItem.input.nextQuestion;
            }
            else {
                findEndQuestion = foundItem.choices[0].nextQuestion;
            }

            if (findEndQuestion){
                if (findEndQuestion === 'end'){
                    setCurrentQuestionKey(lastkey);
                    // Clear the location.state after handling the logic
                    navigate(location.pathname, { replace: true }); // Redirect to the same page without state  
                }
            }

            if (Array.isArray(arrayItemChoices) && findEndQuestion !== 'end') { 
                // Find the item where text matches lastKeyResult.choice
                const matchedItem = arrayItemChoices.find((item) => item.text === lastKeyResult.choice);
                if (matchedItem) {                     
                    if ( lastKeyResult.choice === 'Personal Devices (Smartphones / Tablets / Laptops)' || lastKeyResult.choice === 'Other type of device'){
                        // Retrieve the choice value from dataQuestion                      
                        const choice = lastKeyResult.choice;
                        // Find the matching choice in questions.dev_per_type.choices
                        const matchingChoice = questions.dev_per_type.choices.find(choiceObj => choiceObj.text === choice);
                        // Get the nextQuestion value if there is a match
                        const nextQuestion = matchingChoice ? matchingChoice.nextQuestion : null;
                        setCurrentQuestionKey(nextQuestion);
                        // Clear the location.state after handling the logic
                        navigate(location.pathname, { replace: true }); // Redirect to the same page without state                       
                    } else {
                        setCurrentQuestionKey(matchedItem.nextQuestion);
                        // Clear the location.state after handling the logic
                        navigate(location.pathname, { replace: true }); // Redirect to the same page without state
                    }
                }
            }
            
            if(lastkey === 'personal_dev_type'){
                let nextQuestion_personal_dev_type;
                if(lastKeyResult.result[0] !== 0 && lastKeyResult.result[1] !== 0) {
                    nextQuestion_personal_dev_type = "personal_internet";
                } else if(lastKeyResult.result[0] !== 0) {
                    nextQuestion_personal_dev_type = "tablet_internet";
                } else if(lastKeyResult.result[1] !== 0) {
                    nextQuestion_personal_dev_type = "laptop_internet";
                }                  
                setCurrentQuestionKey(nextQuestion_personal_dev_type);
                // Clear the location.state after handling the logic
                navigate(location.pathname, { replace: true }); // Redirect to the same page without state
            }

            if (currentQuestion.input && lastkey !== 'dev_per_type' &&  findEndQuestion !== 'end'){              
                setCurrentQuestionKey(currentQuestion.input.nextQuestion);
                // Clear the location.state after handling the logic
                navigate(location.pathname, { replace: true }); // Redirect to the same page without state
            }
        }
    }, [lastkey, isUpload, location.pathname, lastKeyResult, navigate]);
   
    
    // input validation 
    useEffect(() => {
        const inputValidationChoice =  formData.initData[currentQuestionKey].choice;
        const inputValidationValue =  formData.initData[currentQuestionKey].input;          
        if (currentQuestionKey === 'personal_dev_type') {           
            if ( inputDevicesValues.tablet > 2500 || inputDevicesValues.laptop > 2500 ){
                message.error('The value must be less than 2500');
            }
        }
        if (inputValidationChoice === 'Cameras' && inputValidationValue > 3750){
            message.error('The value must be less than 3750');
        }
        if (inputValidationChoice === 'Other type of device' && inputValidationValue > 3750){
            message.error('The value must be less than 3750');
        }      
        if (inputValidationChoice === 'Sensors' && inputValidationValue > 75000){
            message.error('The value must be less than 75000');
        }    
        if (inputValidationChoice === 'Drones' && inputValidationValue > 75){
            message.error('The value must be less than 75');
        } 
    }, [formData , inputDevicesValues, currentQuestionKey]);


    // Effect to handle navigation after form data is updated
    useEffect(() => {
        if (nextQuestionKey && nextQuestionKey !== 'end') {
            setCurrentQuestionKey(nextQuestionKey);
        }   
    }, [nextQuestionKey]);


    useEffect(() => {
        const devices = JSON.parse(localStorage.getItem('devices')) || [];
        const mergedResult = mergeDevicesData(devices);
        setNewDevicesPerType(mergedResult.dev_per_type); // Update state with the merged result
    }, [count]);


    useEffect(() => { 
        const handleBackPreviousQuestion = () => { 
            const currentQuestion = questions[currentQuestionKey];      
            const keysArray = Object.keys(formData.data); // Get all keys
            const prevKey = keysArray[keysArray.length - 1]; // Find the last key
            console.log('currentQuestion' ,currentQuestion?.device);
            console.log('prevKey' ,prevKey);

            if (formData.data && Object.keys(formData.data).length > 0) {
                if (keysArray.length > 0) {
                    let updatedData = { ...formData.data };
                    delete updatedData[prevKey];
                   
                    let updatedInitData;
                    updatedInitData = {
                        ...formData.initData,
                        [prevKey]: initQuestionsData[prevKey],
                    };

                    if(selectedLevel === 'Community') {
                        const devices = JSON.parse(localStorage.getItem('devices')) || [];

                        // Check if the current count exists in any object's `counter`
                        const countExists = Object.values(updatedData).some(
                            (obj) => obj.counter === count
                        );

                        let mergedResult;

                        console.log('devices', devices);

                        if (!countExists) {
                            if(count === 0) {
                                setCount(0);
                            } else {
                                setCount((prevCount) => prevCount - 1);
                            }

                            if (prevKey === 'dev_per_type') {
                                const updateDevicesArray = devices.slice(0, -1)
                                localStorage.setItem('devices', JSON.stringify(updateDevicesArray)); 
                            }
                        } else {                        
                            if ((currentQuestionKey === 'sensor_rate') || (currentQuestionKey === 'type_of_drones') || (currentQuestionKey === 'personal_dev_type') || (currentQuestionKey === 'camera_rate') || (currentQuestionKey === 'robot_type')) {                         
                                const updateDevicesArray = devices.slice(0, -1)
                                localStorage.setItem('devices', JSON.stringify(updateDevicesArray)); 

                                const devicesArray = JSON.parse(localStorage.getItem('devices')) || [];
                                mergedResult = mergeDevicesData(devicesArray);
            
                                console.log('mergedResult', mergedResult?.dev_per_type)
                                setNewDevicesPerType(mergedResult?.dev_per_type); // Update state with merged result

                                updatedInitData = {
                                    ...formData.initData,
                                    dev_per_type: mergedResult?.dev_per_type,
                                    [prevKey]: initQuestionsData[prevKey],
                                };

                                updatedData = {
                                    ...formData.data,
                                    dev_per_type: mergedResult?.dev_per_type,
                                };
                            }
                        }
                    }
            
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        initData: updatedInitData,
                        data: updatedData,
                    }));
    
                    if (prevKey === 'personal_dev_type' || prevKey === 'dev_per_type') {
                        setDevicesChoice({
                            tablet: false,
                            laptop: false
                        });
                        setInputDevicesValues({
                            tablet: '',
                            laptop: ''
                        });
                    }              
    
                    setCurrentQuestionKey(prevKey);             
                }
            } else {
                navigate(-1);
            }
        };
    
        setBackAction(() => handleBackPreviousQuestion); 
      
        return () => setBackAction(null);
    }, [setBackAction, selectedLevel, formData, currentQuestionKey, navigate, count]);

   
    const handleChoiceChange = (choice) => {
        const nextQuestion = choice.nextQuestion;

        setFormData(prevFormData => {
            const devices = JSON.parse(localStorage.getItem('devices')) || [];
            const mergedResult = mergeDevicesData(devices);

            setNewDevicesPerType(mergedResult.dev_per_type); // Update state with merged result

            const updatedData = {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    dev_per_type: mergedResult.dev_per_type,
                    [currentQuestionKey]: {
                        ...prevFormData.initData[currentQuestionKey],
                        type: "string",
                        choice: choice.text,
                        counter: count,
                        result: questions[currentQuestionKey].choices.map(c => c.text === choice.text ? 1 : 0),
                    },
                },
                data: {
                    ...prevFormData.data,
                    dev_per_type: mergedResult.dev_per_type,
                    [currentQuestionKey]: {
                        ...prevFormData.data[currentQuestionKey],
                        type: "string",
                        choice: choice.text,
                        counter: count,
                        result: questions[currentQuestionKey].choices.map(c => c.text === choice.text ? 1 : 0),
                    },
                },
            };

            if (currentQuestionKey === 'dev_per_type') {
                updateDevicesInStorage(updatedData.initData[currentQuestionKey], count, setNewDevicesPerType);
            }

            return updatedData;
        });
        
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

            const devices = JSON.parse(localStorage.getItem('devices')) || [];
            
            //Merge all devices data
            const mergedResult = mergeDevicesData(devices);
            setNewDevicesPerType(mergedResult.dev_per_type); // Update state with merged result

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
                    dev_per_type: mergedResult.dev_per_type,
                    [currentQuestionKey]: {
                        ...prevFormData.initData[currentQuestionKey],
                        type: "string",
                        input: value,
                        counter: count,
                        result: updatedResult
                    },
                },
                data: {
                    ...prevFormData.data,
                    dev_per_type: mergedResult.dev_per_type,
                    [currentQuestionKey]: {
                        ...prevFormData.data[currentQuestionKey],
                        type: "string",
                        input: value,
                        counter: count,
                        result: updatedResult
                    }
                }
            };

            if (currentQuestionKey === 'dev_per_type') {
                updateDevicesInStorage(updatedFormData.initData[currentQuestionKey], count, setNewDevicesPerType);
            }
        
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
 

    const handleConfirmData = async () => {
        setLoading(true);

        try {
            // Save the form data and set the next question key
            setFormData(
                prevFormData => {
                    const updatedInitData = {
                        ...prevFormData.initData,
                        ...newDevicesPerType.dev_per_type,
                    };
                
                    // Similarly update the dev_per_type key in data
                    const updatedData = {
                        ...prevFormData.data,
                        ...newDevicesPerType.dev_per_type,
                    };
                
                    // Construct the updated formData
                    const updatedFormData = {
                        ...prevFormData,
                        initData: updatedInitData,
                        data: updatedData,
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
                localStorage.removeItem("devices");
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



    const handleNewDevice = () => {
        setFormData((prevFormData) => {
            const currentArray = [...prevFormData.initData['dev_per_type'].result];

            return {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    dev_per_type: {
                        ...prevFormData.initData['dev_per_type'],
                        choice: '',
                        input: '',
                        result: currentArray,
                    },
                },
                data: {
                    ...prevFormData.data,
                    dev_per_type: {
                        ...prevFormData.data['dev_per_type'],
                        choice: '',
                        input: '',
                        result: currentArray,
                    },
                },
            };
        });
        setCount(count + 1);
        setCurrentQuestionKey('dev_per_type');
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
                        tooltips={tooltips.deviceInfoButton.description}
                    />
                    <QuestionItem
                        questionData={currentQuestionData}
                        level={selectedLevel}
                        selectedDevicesList={JSON.parse(localStorage.getItem('devices')) || {}}
                        formData={formData.initData[currentQuestionKey] || {}}
                        handleChoiceChange={handleChoiceChange}
                        handleInputChange={handleInputChange}
                        handleNext={handleNextQuestion}
                        handleConfirm={handleConfirmData}
                        handleNewDevice={handleNewDevice}
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