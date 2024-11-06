import React, { useState , useEffect , useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row, Card, Select, message } from 'antd';
import { stepsLabels } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';
import { countries, terrainTypes, weatherConditions } from '../Data/Data';
import LocationInput from '../Components/WizardElements/LocationInput';
import LocationCheckbox from '../Components/WizardElements/LocationCheckbox';
import { initLocationData } from '../Data/JsonObjects';

const { Option } = Select

function LocationDetails() {
    const navigate = useNavigate();
    const effectRan = useRef(false); // To ensure useEffect runs only once
    const [location, setLocation] = useState();
    const [area, setArea] = useState();
    const [vegetationHeight, setVegetationHeight] = useState();
    const [checkedTerrainTypes, setCheckedTerrainTypes] = useState(initLocationData.Terrain.result);
    const [checkedWeatherConditions, setCheckedWeatherConditions] = useState(initLocationData.Weather.result);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        // run one time 
        if (effectRan.current) return;
        effectRan.current = true;   

        if (localStorage.getItem('locationDetails') !== null  ){
            const locationDetailslocalstorage = JSON.parse(localStorage.getItem('locationDetails'));
            if (locationDetailslocalstorage["location"]?.result) {
                setLocation(locationDetailslocalstorage["location"].result);
            }
            if (locationDetailslocalstorage["Area"]?.result) {
                setArea(locationDetailslocalstorage["Area"].result);
            }
            if (locationDetailslocalstorage["Vegetation_height"]?.result) {
                setVegetationHeight(locationDetailslocalstorage["Vegetation_height"].result);
            }
            if (locationDetailslocalstorage["Terrain"]?.result) {
                setCheckedTerrainTypes(locationDetailslocalstorage["Terrain"].result);
            }
            if (locationDetailslocalstorage["Weather"]?.result) {
                setCheckedWeatherConditions(locationDetailslocalstorage["Weather"].result);
            }
        }
    }, []);  


    useEffect(() => {          
        if ( !location  ||  !checkedTerrainTypes.includes(1) || checkedWeatherConditions.slice(0, 3).filter(value => value === 1).length !== 1   ){
            setDisabled(true)
        } else if (vegetationHeight > 50 && checkedTerrainTypes.at(1) === 1){
            message.error('The average vegetation height cannot be higher than 50 meters')
            setDisabled(true)
        }
        else if (area > 5000  ){ 
            message.error('The area cannot be higher than 5000.')
            setDisabled(true)
        }
        else if (!area){
            setDisabled(true)
        }
        else{        
            setDisabled(false)
        }    
    }, [vegetationHeight ,location , checkedTerrainTypes , checkedWeatherConditions , area]);
    
    const handleChangeTerrain = (index) => {
        const newCheckedItems = [...checkedTerrainTypes];
        newCheckedItems[index] = newCheckedItems[index] === 1 ? 0 : 1;

        // Conflict logic: Plain (index 0) vs Mountain (index 2)
        if (newCheckedItems[0] === 1 && newCheckedItems[2] === 1) {
            message.error('You cannot select both Plain and Mountain at the same time.');
            // Deselect Mountain (index 2)
            newCheckedItems[2] = 0;
        } else if (newCheckedItems[2] === 1 && newCheckedItems[0] === 1) {
            message.error('You cannot select both Plain and Mountain at the same time.');
            // Deselect Plain (index 0)
            newCheckedItems[0] = 0;
        }        
        setCheckedTerrainTypes(newCheckedItems);
    };

    const handleChangeWeather = (index) => {
        const newCheckedItems = [...checkedWeatherConditions];
        newCheckedItems[index] = newCheckedItems[index] === 1 ? 0 : 1;
        setCheckedWeatherConditions(newCheckedItems);
    };

    const handleChangeLocation= (value) => {
        setLocation(value);
    };

    const handleChangeArea = (value) => {       
        setArea(value); 
    };

    const handleChangeVegetationHeight = (value) => {
        setVegetationHeight(value); 
    };

    const handleNextClick = () => {
        const data = {
            location: {
                type: "string", 
                result: location
            },
            Area: {
                type: "string", 
                result: parseFloat(area) 
            },
            Terrain: {
                type: "string",
                result: checkedTerrainTypes,
            },
            Weather: {
                type: "string",
                result: checkedWeatherConditions,
            },
            Vegetation_height: {
                type: "string", 
                result: vegetationHeight ?? 0
            },
        };
        localStorage.setItem('locationDetails', JSON.stringify(data));
        console.log('locationDetails:', data);
        navigate('/questions');    
    };

  
    return (
        <>
            <Row gutter={[32, 12]} style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[2].icon} 
                    subicon={stepsLabels[2].subicon} 
                    title={stepsLabels[2].title} 
                    subtitle={stepsLabels[2].subtitle}
                    level={2} 
                    color={stepsLabels[2].color}
                />
                <Col span={6} xs={24} md={6}>
                    <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1 }}>
                        <div style={{ color: '#1D1D1D', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                            Country
                        </div>
                        <div style={{ marginTop: "0px" }}>
                            <Select
                                value={location} 
                                //defaultValue={defaultValue}
                                style={{ width: "100%" }}
                                onChange={handleChangeLocation}
                            >
                                <Option value="">Select</Option>
                                {countries.map(country => (
                                    <Option key={country.code} value={country.code}>
                                        {country.name}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Card>

                    <LocationInput
                        inputName={'Area'}
                        label={<span>Area size (km<sup>2</sup>)</span>} 
                        value={area} 
                        onChange={(e) => handleChangeArea(e.target.value)} 
                         
                    />
                    {checkedTerrainTypes.at(1) === 1 && (
                        <LocationInput 
                            inputName={'Vegetation Height'}
                            label={' Vegetation Height'} 
                            value={vegetationHeight} 
                            onChange={(e) => handleChangeVegetationHeight(e.target.value)} 
                            text={'m'}                         
                        />
                    )}
                </Col>
                
                <LocationCheckbox 
                    label={'Terrain Type'}
                    text={'Please choose the option that better describes the terrain type of your location:'}
                    data={terrainTypes}
                    checkedItems={checkedTerrainTypes}
                    onChange={handleChangeTerrain}
                /> 

                <LocationCheckbox 
                    label={'Typical Weather Conditions'}
                    text={'Please choose one option that better describes the weather conditions at your location:'}                    
                    data={weatherConditions}                    
                    checkedItems={checkedWeatherConditions}
                    onChange={handleChangeWeather}
                />
                <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
                    <ConfirmButton disabled={disabled} onClick={() => handleNextClick()} color={'black'} text={'Confirm Selection'}/>  
                </Col>       
            </Row>
        </>
    );
}

export default LocationDetails;