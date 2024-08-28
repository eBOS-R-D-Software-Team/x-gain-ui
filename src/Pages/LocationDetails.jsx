import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row, Card, Select } from 'antd';
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

    const [location, setLocation] = useState(initLocationData.location.result);
    const [area, setArea] = useState(initLocationData.Area.result);
    const [vegetationHeight, setVegetationHeight] = useState(initLocationData.Vegetation_height.result);
    const [checkedTerrainTypes, setCheckedTerrainTypes] = useState(initLocationData.Terrain.result);
    const [checkedWeatherConditions, setCheckedWeatherConditions] = useState(initLocationData.Weather.result);

    
    const handleChangeTerrain = (index) => {
        const newCheckedItems = [...checkedTerrainTypes];
        newCheckedItems[index] = newCheckedItems[index] === 1 ? 0 : 1;
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
                result: area
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
                result: vegetationHeight
            },
        };
        localStorage.setItem('locationDetails', JSON.stringify(data));
        console.log('locationDetails:', data);
        navigate('/questions');
    };

  
    return (
        <>
            <Row gutter={[32, 0]} style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[1].icon} 
                    subicon={stepsLabels[1].subicon} 
                    title={stepsLabels[1].title} 
                    subtitle={stepsLabels[1].subtitle}
                    level={2} 
                    color={'#00678A'}
                />
                <Col span={6} xs={24} md={6}>
                    <Card style={{ background: "rgba(0, 44, 60, 0.10)", flex: 1 }}>
                        <div style={{ color: '#1D1D1D', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                            Country
                        </div>
                        <div style={{ marginTop: "0px" }}>
                            <Select
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
                        label={'Area “A” Size'} 
                        value={area} 
                        onChange={(e) => handleChangeArea(e.target.value)} 
                        text={<>{'Km'}<sup>2</sup></>} 
                    />
                    <LocationInput 
                        label={' Vegetable Height'} 
                        value={vegetationHeight} 
                        onChange={(e) => handleChangeVegetationHeight(e.target.value)} 
                        text={'m'} 
                    />
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
                    text={'Please choose the options that better describe the weather conditions at your location:'}
                    data={weatherConditions}
                    checkedItems={checkedWeatherConditions}
                    onChange={handleChangeWeather}
                />
                <ConfirmButton onClick={() => handleNextClick()} />         
            </Row>
        </>
    );
}

export default LocationDetails;