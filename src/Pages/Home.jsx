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
                    <div style={{ color: 'black', fontSize:'1rem', margin: '30px 20px' }}>
                        <p>This tool is a deterministic decision-support system based on explicitly defined models, assessment criteria, and validated project knowledge. Unlike language-based AI systems, it does not generate probabilistic or inferred recommendations.</p>
                        <p>The step-by-step interaction required reflects the need for traceable, explainable, and reliable outcomes, particularly for infrastructure planning, and investment decisions. The tool is intended as a structured reference to support informed decision-making, not as an automated or authoritative decision engine.</p>
                        <p>KFT step by step video guide with examples on <a style={{ color:'black', fontWeight: 'bold', textDecoration: 'underline' }} href="https://www.youtube.com/watch?v=zNt2opcJ_-U" target="_blank" rel="noreferrer">Youtube</a></p>
                    </div>
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