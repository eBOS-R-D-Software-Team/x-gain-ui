import React, { useState , useRef   } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Modal, message } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import SaveButton from './Buttons/SaveButton';
import { handleFileUpload } from './Buttons/UploadButton';
import BackButton from './Buttons/BackButton';
import { BackButtonProvider } from '../Context/BackButtonContext';
import { postDataToICCSApi, postSocialQuestions,  postSolutionsAnalysis, postSocialAnswers, postEnvironmentalData } from '../Data/Api';

const { Header, Content } = Layout;

const HeaderMenu = ({ currentQuestionKey, selectedLevel, count, handlePreviousQuestion }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);
    const currentLocationPage = location.pathname;

    const showModal = () => setIsModalOpen(true);

    // Helper to save JSON fields to localStorage
    const storeInLocalStorage = (key, value) => {
        if (value !== null) localStorage.setItem(key, JSON.stringify(value));
    };


    // Function to check if specific fields in fileContent are available
    const checkFileContent = () => ({
        hasEmployeeValue: fileContent?.hasEmployeeValue !== null,
        economicValue: fileContent?.Economicvalue !== null,
        environmentalValue: fileContent?.Environmentalvalue !== null,
        technologicalValue: fileContent?.Technologicalvalue !== null,
        dataQuestionUploadButton: fileContent?.DataQuestionUploadButton && Object.keys(fileContent.DataQuestionUploadButton).length > 0,
        sectorsServicesLevelDetails: fileContent?.sectorsServicesLevelDetails !== null,
        sectorsServicesDetails: fileContent?.sectorsServicesDetails !== null,
        locationDetails: fileContent?.locationDetails !== null,
        devices: fileContent?.devices !== null,
    });


    const handleOk = async () => {
        setConfirmLoading(true);
        if (!fileContent) {
            message.error('No file content available. Make sure to upload a JSON file.');
            return;
        }

        // Store relevant fields from fileContent in localStorage
        const keys = [
            'sectorsServicesLevelDetails', 'sectorsServicesDetails', 'locationDetails',
            'questionsFormData', 'DataQuestionUploadButton', 'Economicvalue', 'Environmentalvalue',
            'Technologicalvalue', 'completeQuestionsFormData', 'hasEmployeeValue', 'answers',
            'dataCalculateSocialScore', 'currentQuestionIndexSocialQuestion', 'socialQuestionsResponse', 'devices'
        ];
        keys.forEach(key => storeInLocalStorage(key, fileContent[key]));

        const {
            hasEmployeeValue, economicValue, environmentalValue, technologicalValue,
            dataQuestionUploadButton, sectorsServicesLevelDetails, sectorsServicesDetails, locationDetails, devices
        } = checkFileContent();

        // Handle navigation based on data availability
        await handleNavigation(
            { hasEmployeeValue, economicValue, environmentalValue, technologicalValue, dataQuestionUploadButton, sectorsServicesLevelDetails, sectorsServicesDetails, locationDetails, devices }
        );

        setFileContent(null);
        fileInputRef.current && (fileInputRef.current.value = '');
    };


    const loadingModalClose = () => {
        setConfirmLoading(false);
        setIsModalOpen(false);
    }


    const handleNavigation = async (checks) => {
        const {
            hasEmployeeValue, economicValue, environmentalValue, technologicalValue,
            dataQuestionUploadButton, sectorsServicesLevelDetails, sectorsServicesDetails, locationDetails, devices
        } = checks;

        try {
            if (economicValue && environmentalValue && technologicalValue && hasEmployeeValue) {
                await completeImpactAssessment();
            } else if (hasEmployeeValue && fileContent.currentQuestionIndexSocialQuestion > 0) {
                await navigateSocialQuestions();
            } else if (hasEmployeeValue) {
                await handleHasEmployeeNavigation();
            } else if (dataQuestionUploadButton && devices) {
                navigateQuestions();
            } else if (locationDetails) {
                navigate("/location-details");
                loadingModalClose();
            } else if (sectorsServicesDetails) {
                navigate("/sector-services");
                loadingModalClose();
            } else if (sectorsServicesLevelDetails) {
                navigate("/sector-services-level");
                loadingModalClose();
            } else {
                navigate("/");
            }
        } catch (error) {
            message.error("An error occurred during the navigation process.");
            resetModalState();
            loadingModalClose();
        }
    };


    const completeImpactAssessment = async () => {
        const response = await postDataToICCSApi();
        if (response) {
            const updatedData = {
                hasEmployees: fileContent.hasEmployeeValue,
                sector: fileContent.sectorsServicesDetails.sector.result,
                service: fileContent.sectorsServicesDetails.service.result,
            };

            localStorage.setItem('socialDetermineQuestionsRequest', JSON.stringify(updatedData));

            if (await postSocialQuestions(updatedData)) {
                const iccs_response = JSON.parse(localStorage.getItem('iccs_response') || '{}');
                await postSolutionsAnalysis();
                await postSocialAnswers(fileContent?.dataCalculateSocialScore);
                await postEnvironmentalData(iccs_response);
                navigate("/impact-assessment");
            }
        }
        resetModalState();
        loadingModalClose();
    };


    const navigateSocialQuestions = async () => {
        const response = await postDataToICCSApi();
        if (response) {
            const updatedData = {
                hasEmployees: fileContent.hasEmployeeValue,
                sector: fileContent.sectorsServicesDetails.sector.result,
                service: fileContent.sectorsServicesDetails.service.result,
            };

            localStorage.setItem('socialDetermineQuestionsRequest', JSON.stringify(updatedData));

            await postSocialQuestions(updatedData);

            navigate("/social-questions", {
                state: { indexQuestion: fileContent.currentQuestionIndexSocialQuestion, isUpload: true },
            });
        }
        resetModalState();
        loadingModalClose();
    };


    const handleHasEmployeeNavigation = async () => {
        if (await postDataToICCSApi()) {
            navigate('/has-employee');
        }
        resetModalState();
        loadingModalClose();
    };


    const navigateQuestions = () => {
        const keys = Object.keys(fileContent?.DataQuestionUploadButton || {});
        const devices = fileContent?.devices || [];
        const lastKey = keys[keys.length - 1];
        navigate("/questions", {
            state: { lastKeyResult: fileContent?.DataQuestionUploadButton[lastKey], lastkey: lastKey, isUpload: true, selectedDevicesListArray: devices },
        });
        resetModalState();
        loadingModalClose();
    };


    const resetModalState = () => {
        setIsModalOpen(false);
        setConfirmLoading(false);
    };

    const handleCancel = resetModalState;

    return(
        <BackButtonProvider>
            <Layout className='layoutPaddingTop' style={{ backgroundColor: '#00A27B', minHeight: '100vh'}}>   
                <img src='/images/icons/logo.png' alt="Logo" className='logoHiden' style={{cursor:'pointer', paddingTop:'0px', margin: 'auto', paddingBottom:'20px' }}/>        
                <Header className="site-layout-background" style={{ backgroundColor: 'transparent'}}>
                    <div className="header-content" style={{ height: '100%' }}>
                        <div className="left-navbar">
                            <img src='/images/icons/logo.png' className='logoLeftSideHiden'  alt="Logo" style={{cursor:'pointer' , paddingBottom:'40px'}}/>
                            {currentLocationPage !== '/home' &&
                                <BackButton 
                                    currentLocationPage={currentLocationPage} 
                                    handlePreviousQuestion={handlePreviousQuestion} // Pass it down here
                                />
                            }
                        </div>                    
                        <div className="right-navbar" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {/* Save Button */}
                            {(selectedLevel === 'Local' || (currentQuestionKey === 'dev_per_type' && count === 0) ||
                                (selectedLevel === 'Community' && !(
                                    (currentQuestionKey === 'dev_per_type' && count > 0) || 
                                    (currentQuestionKey === 'sensor_rate' && count > 0) ||
                                    (currentQuestionKey === 'type_of_drones' && count > 0) ||
                                    (currentQuestionKey === 'personal_dev_type' && count > 0) ||
                                    (currentQuestionKey === 'camera_rate' && count > 0) ||
                                    (currentQuestionKey === 'robot_type' && count > 0)
                                ))) &&
                                currentLocationPage !== '/home' && 
                                currentLocationPage !== '/sector-services-level' && (
                                    <button
                                        onClick={SaveButton}
                                        style={{
                                            borderRadius: '7px',
                                            background: '#00678A',
                                            color: 'white',
                                            border: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '10px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <SaveOutlined />
                                        <span className='headerBtnText' style={{ paddingTop: '10%', paddingRight: '2%' }}>Save</span>
                                    </button>
                                )
                            }
                            {/* Conditionally render the Upload button only on the home page */}
                            {currentLocationPage === '/home' && (
                                <button
                                    onClick={showModal}
                                    style={{
                                        borderRadius: '7px',
                                        background: '#00678A',
                                        color: 'white',
                                        border: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <UploadOutlined />
                                    <span className='headerBtnText' style={{ paddingTop: '10%', paddingRight: '2%' }}>Upload</span>
                                </button>
                            )}

                            {/* Modal Popup */}
                            <Modal title="Upload JSON File" open={isModalOpen} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
                                <input
                                    ref={fileInputRef} // Attach ref to input
                                    type="file"
                                    accept=".json"
                                    onChange={(event) => handleFileUpload(event, setFileContent)}
                                />
                            </Modal>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        // margin: '24px 16px',
                        // padding: 16,
                        // background: '#F6FFF4',
                        minHeight: 280,
                    }}
                >
                    <Outlet />  {/* This is where the routed content will be rendered */}
                </Content>
            </Layout>
        </BackButtonProvider>
    )
}

export default HeaderMenu;