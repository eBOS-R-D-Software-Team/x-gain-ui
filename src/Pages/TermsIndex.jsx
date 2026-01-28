import React, { useState } from 'react';
import { Button, Checkbox, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';


function TermsIndex() {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const onChange = (e) => {       
        setChecked(e.target.checked);
    };


    const buttonStart = () => {
        localStorage.setItem('Terms', checked );
        navigate('/home');        
    };


    return(
        <div className='backgroundTermsIndex'>
            <Row>
                <Col span={12} offset={6}>
                    <img className='logoTermsIndex' src='../../images/xgain_logo.png' alt='logo'></img> 
                </Col>  
                <Col span={12} xs={20} lg={12} style={{ margin: 'auto' }}>      
                    <h1 style={{color:'white', margin: '0 0' }}>KNOWLEDGE FACILITATION TOOL</h1>
                    <div style={{ color:'white', fontSize:'1rem' }}>
                        <p>This tool is a deterministic decision-support system based on explicitly defined models, assessment criteria, and validated project knowledge. Unlike language-based AI systems, it does not generate probabilistic or inferred recommendations.</p>
                        <p>The step-by-step interaction required reflects the need for traceable, explainable, and reliable outcomes, particularly for infrastructure planning, and investment decisions. The tool is intended as a structured reference to support informed decision-making, not as an automated or authoritative decision engine.</p>
                        <p>KFT step by step video guide with examples on <a style={{ color:'white', fontWeight: 'bold', textDecoration: 'underline' }} href="https://www.youtube.com/watch?v=zNt2opcJ_-U" target="_blank">Youtube</a></p>
                    </div>
                    <Button className='startButtonTermsIndex' onClick={buttonStart} disabled={!checked}>START</Button>
                </Col>
                <Col span={12} offset={6} className='termsCheckboxCol'>
                    <Checkbox style={{color:'white', fontSize:'1rem', marginTop: 20 }} checked={checked} onChange={onChange}>
                        I understand that the generated data will be kept for evaluation and research purposes only and that it is fully anonymised.
                    </Checkbox>
                </Col>
            </Row>   
        </div>
    )
}

export default TermsIndex;