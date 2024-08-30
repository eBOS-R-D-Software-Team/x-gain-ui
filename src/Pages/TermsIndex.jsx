import React, { useState } from 'react';
import { Button , Checkbox , Dropdown, Select  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';


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
    const onChangelang = (value) => {      
      };
      const onSearch = (value) => {          
      };

     const options=[
        { value: "EN", label: "EN", imageUrl: "images/languages/en.png" },
        { value: "ES", label: "ES", imageUrl: "images/languages/es.png" },
        { value: "GR", label: "GR", imageUrl: "images/languages/gr.png" },
        { value: "DE", label: "DE", imageUrl: "images/languages/de.png" },
        ];

    return(
        <div className='backgroundTermsIndex'>
            <img className='logoTermsIndex' src='../../images/logo.png'></img>         
            <h1 style={{color:'white'}}>KNOWLEDGE FACILITATION TOOL</h1>
            <Button className='startButtonTermsIndex' onClick={buttonStart} disabled={!checked}>START</Button>
            <p style={{  width: '20%' , marginLeft:'40%'   }}>
                <Checkbox style={{color:'white' , fontSize:'1.1rem' }} checked={checked} onChange={onChange}>
                            I understand that the generated data will be kept for
                             evaluation and research purposes only and that it is fully anonymised.
                </Checkbox>
            </p>
            <Select
                showSearch
                placeholder="Select a language"
                optionFilterProp="label"
                onChange={onChangelang}
                
                style={{ width: 100 }}

                >
                {options.map((option) => (
                    <Select.Option key={option.value} value={option.value} label={option.label}>
                    {option.imageUrl && (
                        <img
                        src={option.imageUrl}
                        alt={option.label}
                        style={{ width: '20px', marginRight: '8px' }}
                        />
                    )}
                    {option.label}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default TermsIndex;