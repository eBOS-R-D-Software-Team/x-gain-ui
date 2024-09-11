import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Avatar, List } from 'antd';
import { stepsLabels } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
function Home() {
    const [enabledSteps, setEnabledSteps] = useState([true, false, false, false]); // Track enabled/disabled state for each step

    useEffect(() => {
        // Check local storage data for enabling steps conditionally
        const updatedEnabledSteps = [true]; // First step is always enabled

        stepsLabels.slice(1).forEach((step, index) => {
            const previousStepData = localStorage.getItem(stepsLabels[index].data); // Get previous step's data
            if (previousStepData !== null && previousStepData !== "null") {
                updatedEnabledSteps.push(true); // Enable this step if previous step's data is available
            } else {
                updatedEnabledSteps.push(false); // Disable this step if previous step's data is missing
            }
        });

        setEnabledSteps(updatedEnabledSteps);
    }, []);

    
    return (
        <>
            <Row gutter={[32, 16]} style={{ paddingTop: 20 }}>
                <Col span={24} className="wizard_steps_col">
                    <div className="wizard_steps_buttons" style={{ backgroundColor: '#FFF', borderRadius: '6px', paddingBottom: 20 }}>
                    {stepsLabels.slice(0, 5).map((step, index) => (
                        <Link key={index} to={enabledSteps[index] ? step.url : "#"} // If the step is enabled, set the correct URL
                        style={{ 
                            //marginRight: "10px",
                            pointerEvents: enabledSteps[index] ? 'auto' : 'none', // Disable pointer events if the step is not enabled
                            opacity: enabledSteps[index] ? 1 : 0.5 // Visually disable the step by reducing opacity
                        }}>
                            <TitleForm 
                                icon={step.icon} 
                                subicon={step.subicon} 
                                title={step.title} 
                                subtitle={step.subtitle}
                                level={2} 
                                color={step.color}
                            />
                        </Link>
                    ))}
                   
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Home;