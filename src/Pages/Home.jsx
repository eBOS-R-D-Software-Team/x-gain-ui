import React, {useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Col, Row } from 'antd';
import { stepsLabels } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';

const SOCIAL_INDEX = 4;

function Home() {
    const [enabledSteps, setEnabledSteps] = useState([true, false, false, false, false, false]); // Track enabled/disabled state for each step
    const location = useLocation();


    useEffect(() => {
        const updatedEnabledSteps = [];

        stepsLabels.slice(0, 6).forEach((step, index) => {
            // Step 0 always enabled
            if (index === 0) {
                updatedEnabledSteps.push(true);
                return;
            }

            if (index === SOCIAL_INDEX) {
                const serviceCompleted = localStorage.getItem(stepsLabels[index - 1].data) !== null;
                const socialCompleted = localStorage.getItem("socialAssessmentCompleted") === "true";
                updatedEnabledSteps.push(serviceCompleted && socialCompleted);
                return;
            }

            if (index === SOCIAL_INDEX + 1) {
                const socialCompleted = localStorage.getItem("socialAssessmentCompleted") === "true";
                updatedEnabledSteps.push(socialCompleted);
                return;
            }

            // NORMAL RULE FOR OTHER STEPS
            const prevStep = stepsLabels[index - 1];
            const prevCompleted =
            localStorage.getItem(prevStep.data) !== null;

            updatedEnabledSteps.push(prevCompleted);
        });

        setEnabledSteps(updatedEnabledSteps);
    }, [location.pathname]);


    return (
        <Row gutter={[32, 16]} style={{ paddingTop: 20 }}>
            <Col span={24} className="wizard_steps_col">
                <div className="wizard_steps_buttons" style={{ backgroundColor: '#FFF', borderRadius: '6px', paddingBottom: 20 }}>
                    {stepsLabels.slice(0, 6).map((step, index) => (
                        <Link key={index} to={enabledSteps[index] ? step.url : "#"} // If the step is enabled, set the correct URL
                            style={{ 
                                pointerEvents: enabledSteps[index] ? 'auto' : 'none', // Disable pointer events if the step is not enabled
                                filter: enabledSteps[index] ? 'opacity(1)' : 'opacity(0.5)' // Visually disable the step by reducing opacity
                            }}
                        >
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
    );
}

export default Home;