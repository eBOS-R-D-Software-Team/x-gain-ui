import React, { useState , useRef   } from 'react';
import { Link, Outlet , useNavigate ,Navigate , useLocation  } from 'react-router-dom';
import { Layout, Menu , Modal , message } from 'antd';
import { SaveOutlined , UploadOutlined , LeftCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd'; 
import SaveButton from './Buttons/SaveButton';
import { handleFileUpload } from './Buttons/UploadButton';
import BackButton from './Buttons/BackButton';
import { BackButtonProvider } from '../Context/BackButtonContext';
import { postDataToICCSApi , postSocialQuestions ,  postSolutionsAnalysis, postSocialAnswers, postEnvironmentalData } from '../Data/Api';

const { Header, Content } = Layout;

const HeaderMenu = ({  handlePreviousQuestion }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [fileContent, setFileContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null); // Ref to control file input element
    const currentLocationPage = location.pathname;

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = async () => {
      setConfirmLoading(true);    
      // Wait for file content to be set before proceeding
      if (!fileContent) {
        message.error('No file content available. Make sure to upload a JSON file.');
        return;
      }
      // Set the values in localStorage if is not null 
      if (fileContent.sectorsServicesLevelDetails !== null) {
          localStorage.setItem('sectorsServicesLevelDetails', JSON.stringify(fileContent.sectorsServicesLevelDetails));
      }
      if (fileContent.sectorsServicesDetails !== null) {
          localStorage.setItem('sectorsServicesDetails', JSON.stringify(fileContent.sectorsServicesDetails));
      }
      if (fileContent.locationDetails !== null) {
          localStorage.setItem('locationDetails', JSON.stringify(fileContent.locationDetails));
      }
      if (fileContent.questionsFormData !== null) {
          localStorage.setItem('questionsFormData', JSON.stringify(fileContent.questionsFormData));
      }
      if (fileContent.DataQuestionUploadButton !== null) {
          localStorage.setItem('DataQuestionUploadButton', JSON.stringify(fileContent.DataQuestionUploadButton));
      }
      if (fileContent.Economicvalue !== null) {
          localStorage.setItem('Economicvalue', JSON.stringify(fileContent.Economicvalue));
      }
      if (fileContent.Environmentalvalue !== null) {
          localStorage.setItem('Environmentalvalue', JSON.stringify(fileContent.Environmentalvalue));
      }
      if (fileContent.Technologicalvalue !== null) {
          localStorage.setItem('Technologicalvalue', JSON.stringify(fileContent.Technologicalvalue));
      }
      if (fileContent.completeQuestionsFormData !== null) {
          localStorage.setItem('completeQuestionsFormData', JSON.stringify(fileContent.completeQuestionsFormData));
      }
      if (fileContent.hasEmployeeValue !== null) {
          localStorage.setItem('hasEmployeeValue', JSON.stringify(fileContent.hasEmployeeValue));
      }
      if (fileContent.answers !== null) {
          localStorage.setItem('answers', JSON.stringify(fileContent.answers));
      }
      if (fileContent.dataCalculateSocialScore !== null) {
        localStorage.setItem('dataCalculateSocialScore', JSON.stringify(fileContent.dataCalculateSocialScore));
      }
      if (fileContent.currentQuestionIndexSocialQuestion !== null) {
          localStorage.setItem('currentQuestionIndexSocialQuestion', parseInt(fileContent.currentQuestionIndexSocialQuestion));
      }
      if (fileContent.socialQuestionsResponse !== null) {
        localStorage.setItem('socialQuestionsResponse', JSON.stringify(fileContent.socialQuestionsResponse));
      }

      const isSectorsServicesLevelDetailsNotNull = fileContent?.sectorsServicesLevelDetails !== null;
      const isSectorsServicesDetailsNotNull = fileContent?.sectorsServicesDetails !== null;
      const isLocationDetailsNotNull = fileContent?.locationDetails !== null;
      const isDataQuestionUploadButtonNotNull =  fileContent?.DataQuestionUploadButton && Object.keys(fileContent.DataQuestionUploadButton).length > 0;
      const ishasEmployeeValueNotNull = fileContent?.hasEmployeeValue !== null;
      const isEconomicvalueNotNull = fileContent?.Economicvalue !== null;
      const isEnvironmentalvalueNotNull = fileContent?.Environmentalvalue !== null;
      const isTechnologicalvalueNotNull = fileContent?.Technologicalvalue !== null;      
      // console.log('isEconomicvalueNotNull',isEconomicvalueNotNull);

      switch (false) {   
        case !isEconomicvalueNotNull && !isEnvironmentalvalueNotNull &&  !isTechnologicalvalueNotNull:
          const response =  await postDataToICCSApi();    
          if (response) {
                const updatedData = {
                  hasEmployees: fileContent.hasEmployeeValue,
                  sector: fileContent.sectorsServicesDetails.sector.result,
                  service: fileContent.sectorsServicesDetails.service.result
              };                
              localStorage.setItem('socialDetermineQuestionsRequest', JSON.stringify(updatedData));
              const response = await postSocialQuestions(updatedData);            
              if (response) {               
                  try {
                    const iccs_response = localStorage.getItem('iccs_response');                    
                    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
                    await postSolutionsAnalysis();
                    await postSocialAnswers(fileContent?.dataCalculateSocialScore);
                    await postEnvironmentalData(JSON.parse(iccs_response));
                    setIsModalOpen(false);
                    setConfirmLoading(false);
                    navigate('/impact-assessment');
                    break;
                } catch (error) {
                    message.error("An error occurred during the submission process");
                    localStorage.removeItem('iccs_response');
                    localStorage.removeItem('solutionsAnalysisResponse');
                    navigate('/home');
                    setIsModalOpen(false);
                    setConfirmLoading(false);
                    break;
                }
              } else {
              setIsModalOpen(false);
              setConfirmLoading(false);
              console.error("Failed to submit data to ICCS API.");
              message.error("Failed to submit data to ICCS API.");
              break;
          }                  
        }
        case isEconomicvalueNotNull && isEnvironmentalvalueNotNull &&  isTechnologicalvalueNotNull:     
   
           if (ishasEmployeeValueNotNull && fileContent.currentQuestionIndexSocialQuestion > 0) { 
                const response =  await postDataToICCSApi();
                console.log('ffffff');
                if (response) {
                        const updatedData = {
                          hasEmployees: fileContent.hasEmployeeValue,
                          sector: fileContent.sectorsServicesDetails.sector.result,
                          service: fileContent.sectorsServicesDetails.service.result
                      };                
                      localStorage.setItem('socialDetermineQuestionsRequest', JSON.stringify(updatedData));
                      const response = await postSocialQuestions(updatedData);            
                      if (response) {
                        setIsModalOpen(false);
                        setConfirmLoading(false);
                        navigate("/social-questions"  , { state: { indexQuestion:  fileContent.currentQuestionIndexSocialQuestion ,  isUpload: true  }  }) ;          
                        break;                      
                      } else {
                      setIsModalOpen(false);
                      setConfirmLoading(false);
                      console.error("Failed to submit data to ICCS API.");
                      message.error("Failed to submit data to ICCS API.")
                      break;
                  }                  
                }
            }
            
            if (ishasEmployeeValueNotNull && fileContent.currentQuestionIndexSocialQuestion == 0) {
              console.log('ishasEmployeeValueNotNull');
              const response =  await postDataToICCSApi();
      
              if (response) {
                setIsModalOpen(false);
                setConfirmLoading(false);
                navigate('/has-employee');              
                break;            
              } else {
                  console.error("Failed to submit data to ICCS API.");
                  message.error("Failed to submit data to ICCS API.")
                  break;
              }
             
            }

        case ishasEmployeeValueNotNull:                 
          if (isDataQuestionUploadButtonNotNull){
          
            const keys = Object.keys(fileContent?.DataQuestionUploadButton);
            const lastkey = keys[keys.length - 1];
            const lastKeyResult = fileContent?.DataQuestionUploadButton[lastkey];
            setIsModalOpen(false);
            setConfirmLoading(false);            
            navigate("/questions" , { state: { lastKeyResult:  lastKeyResult , lastkey: lastkey , isUpload: true } }) 
            break;
          }    
        
        case isDataQuestionUploadButtonNotNull:                 
           if (isLocationDetailsNotNull) {   
            setIsModalOpen(false);
            setConfirmLoading(false);       
            navigate("/location-details") 
            break;            
          }
  
        case isLocationDetailsNotNull:         
          if (isSectorsServicesDetailsNotNull) {     
            setIsModalOpen(false);
            setConfirmLoading(false);       
            navigate("/sector-services") 
            break;
          }         
  
        case isSectorsServicesDetailsNotNull:         
          if (isSectorsServicesLevelDetailsNotNull) {   
            setIsModalOpen(false);
            setConfirmLoading(false);            
            navigate("/sector-services-level") 
            break;
          }         
  
        case isSectorsServicesLevelDetailsNotNull:     
          setIsModalOpen(false);
          setConfirmLoading(false);    
          navigate("/") 
          break;
  
        default:             
            navigate("/")
      }

        // After processing the file, reset fileContent and clear the file input
        setFileContent(null);

        // Clear the file input by resetting its value
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the input field
        }

    };
    const handleCancel = () => {
      setIsModalOpen(false);

      // Also clear fileContent and the file input when canceling the modal
      setFileContent(null);
      if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear the input field
      }
    };

    return(
        <BackButtonProvider>
            <Layout className='layoutPaddingTop' style={{ backgroundColor: '#00A27B', minHeight: '100vh'}}>   
            <img src='/images/icons/logo.png' alt="Logo" className='logoHiden' style={{cursor:'pointer' , width:'60%' , paddingTop:'0px', margin: 'auto', paddingBottom:'20px' }}/>        
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
                          {currentLocationPage !== '/home' && currentLocationPage !== '/sector-services-level' && (
                          <Tooltip title="Save as JSON">
                              <button
                                  onClick={SaveButton}
                                  style={{
                                      width: '60px',
                                      height: '60px',
                                      borderRadius: '7px',
                                      background: '#00678A',
                                      color: 'white',
                                      border: 'none',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      padding: '10px',
                                  }}
                              >
                                  <SaveOutlined style={{ fontSize: '24px' }} />
                                  <span style={{ fontSize: '12px', paddingTop: '10%', paddingRight: '2%' }}>Save</span>
                              </button>
                          </Tooltip>
                          )}
                          {/* Conditionally render the Upload button only on the home page */}
                          {currentLocationPage === '/home' && (
                              <Tooltip title="Upload JSON file">
                                  <button
                                      onClick={showModal}
                                      style={{
                                          width: '60px',
                                          height: '60px',
                                          borderRadius: '7px',
                                          background: '#00678A',
                                          color: 'white',
                                          border: 'none',
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          padding: '10px',
                                      }}
                                  >
                                      <UploadOutlined style={{ fontSize: '24px' }} />
                                      <span style={{ fontSize: '12px', paddingTop: '10%', paddingRight: '2%' }}>Upload</span>
                                  </button>
                              </Tooltip>
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
                        padding: 36,
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