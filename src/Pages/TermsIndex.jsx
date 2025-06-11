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
            <img className='logoTermsIndex' src='../../images/logo.png' alt='logo'></img>         
            <h1 style={{color:'white'}}>KNOWLEDGE FACILITATION TOOL</h1>
            <Button className='startButtonTermsIndex' onClick={buttonStart} disabled={!checked}>START</Button>
            <Row>
                <Col span={12} offset={6} className='termsCheckboxCol'>
                    <Checkbox style={{color:'white', fontSize:'1.1rem', marginTop: 40 }} checked={checked} onChange={onChange}>
                        I understand that the generated data will be kept for evaluation and research purposes only and that it is fully anonymised.
                    </Checkbox>
                </Col>
            </Row>
           
        </div>
    )
}

export default TermsIndex;