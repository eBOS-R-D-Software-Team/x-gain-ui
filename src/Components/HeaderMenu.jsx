import React, { useState } from 'react';
import { Link, Outlet , useNavigate ,Navigate , useLocation  } from 'react-router-dom';
import { Layout, Menu , Modal  } from 'antd';
import { SaveOutlined , UploadOutlined , LeftCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd'; 
import SaveButton from './Buttons/SaveButton';
import { handleFileUpload } from './Buttons/UploadButton';
import BackButton from './Buttons/BackButton';
import { BackButtonProvider } from '../Context/BackButtonContext';

const { Header, Content } = Layout;

const HeaderMenu = ({  handlePreviousQuestion }) => {

    const navigate = useNavigate();
    const location = useLocation();

    const [fileContent, setFileContent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentLocationPage = location.pathname;

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);

      const isSectorsServicesLevelDetailsNotNull = fileContent?.sectorsServicesLevelDetails !== null;
      const isSectorsServicesDetailsNotNull = fileContent?.sectorsServicesDetails !== null;
      const isLocationDetailsNotNull = fileContent?.locationDetails !== null;
      const isQuestionsFormDataNotNull = fileContent?.questionsFormData !== null;

      switch (false) {    
        case !isQuestionsFormDataNotNull:  
        if (isQuestionsFormDataNotNull){
            navigate("/questions" , { state: { questionsId:  "robot_image_freq" } }) 
            break;
          }                   
          else if (isLocationDetailsNotNull) {          
            navigate("/location-details") 
            break;            
          }
  
        case isLocationDetailsNotNull:         
          if (isSectorsServicesDetailsNotNull) {            
            navigate("/sector-services") 
            break;
          }         
  
        case isSectorsServicesDetailsNotNull:         
          if (isSectorsServicesLevelDetailsNotNull) {               
            navigate("/sector-services-level") 
            break;
          }         
  
        case isSectorsServicesLevelDetailsNotNull:         
          navigate("/") 
          break;
  
        default:             
            navigate("/")
      }

    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
   

    const items = [
        {
            key: '1',
            label: (
              <Tooltip title="Save as JSON">
                 <button onClick={SaveButton}  style={{width:'40px' , height:'40px' , borderRadius:'7px' , background: '#00678A' , color: 'white' , border: 'none'}}><SaveOutlined style={{ fontSize: '24px' }}/></button>
              </Tooltip>
            ),
        },
        {
          key: '2',
          label: (
            <Tooltip title="Upload JSON file"> 
                <button onClick={showModal} style={{width:'40px' , height:'40px' , borderRadius:'7px' , background: '#00678A' , color: 'white' , border: 'none', textDecoration:'underline' }}><UploadOutlined style={{ fontSize: '24px' }} /></button>
            </Tooltip>
          ),
        }
      ];

    return(
        <BackButtonProvider>
            <Layout style={{ backgroundColor: '#00A27B', minHeight: '100vh', paddingTop: 40}}>          
                <Header className="site-layout-background" style={{ backgroundColor: 'transparent'}}>
                    <div className="header-content" style={{ height: '100%' }}>
                        <div className="left-navbar">
                            <img src='/images/icons/logo.png' alt="Logo" style={{cursor:'pointer'}}/>
                            <BackButton 
                                currentLocationPage={currentLocationPage} 
                                handlePreviousQuestion={handlePreviousQuestion} // Pass it down here
                            />
                        </div>
                    
                        <div className="right-navbar">
                            <Menu mode="horizontal" items={items} style={{ backgroundColor: 'transparent', border: 'none' }}/>        
                            {/* Modal Popup */}
                            <Modal title="Upload JSON File" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>                            
                                <input 
                                    type="file" 
                                    accept=".json" 
                                    onChange={(event) => handleFileUpload(event, setFileContent)} 
                                />                           
                                {fileContent && (
                                    <div>
                                        <h3>File Content:</h3>
                                        <pre>{JSON.stringify(fileContent, null, 2)}</pre>
                                    </div>
                                )}
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