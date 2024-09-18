import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import { stepsLabels, sectors, services as initialServices } from '../Data/Data';
import TitleForm from '../Components/WizardElements/TitleForm';
import SubtitleForm from '../Components/WizardElements/SubtitleForm';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';
import SectorServiceItem from '../Components/WizardElements/SectorServiceItem';


function SectorServices() {
    const navigate = useNavigate();

    const [services, setServices] = useState(initialServices);
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({});


    const handleSectorChange = (selectedSectorId) => {
        setSelectedSector(selectedSectorId);

        const sector = sectors.find(c => c.id === selectedSectorId);
        setFormData(prevFormData => ({
            ...prevFormData,
            sector: {
                type: "text", 
                result: sector.text
            }
        }));

        setSelectedService(null); // Reset selected user type

        //Enable services based on sector selection
        const updatedServices = services.map(service => ({
            ...service,
            isActive: service.sectors_ids.includes(selectedSectorId)
        }));
        setServices(updatedServices);
    };


    const handleServiceChange = (serviceId) => {
        setSelectedService(serviceId);

        const service = services.find(c => c.id === serviceId);
        setFormData(prevFormData => ({
            ...prevFormData,
            service: {
                type: "text", 
                result: service.text
            }
        }));
    };


    const handleNextClick = () => {
        if (selectedSector && selectedService) {
            localStorage.setItem('sectorsServicesDetails', JSON.stringify(formData));
            navigate('/location-details');
        }
    };
  
  
    return (
        <>
            <Row gutter={[32]} style={{ paddingTop: 10, backgroundColor: '#FFF', borderRadius: 20 }}>
                <TitleForm 
                    icon={stepsLabels[1].icon} 
                    subicon={stepsLabels[1].subicon} 
                    title={stepsLabels[1].title} 
                    subtitle={stepsLabels[1].subtitle}
                    level={2} 
                    color={stepsLabels[1].color}
                />
                <Col span={8} xs={24} lg={8}>
                    <SubtitleForm avatar={"/images/sector-icons/sector.svg"} text='Sector Selection'/>
                    <SectorServiceItem
                        data={sectors}
                        selectedItemId={selectedSector}
                        onItemChange={handleSectorChange}
                    />
                </Col>
                <Col span={16} xs={24} lg={16}>
                    <SubtitleForm avatar={"/images/sector-icons/service.svg"} text='Service Selection'/>
                        
                    <Row gutter={[12]} style={{ paddingTop: 10, backgroundColor: '#FFF', justifyContent: 'center', borderRadius: 20 }}>
                        <Col span={10} xs={24} lg={12} style={{ textAlign: '-webkit-center' }}>
                            <SectorServiceItem
                                data={services.slice(0, Math.ceil(services.length / 2))}
                                selectedItemId={selectedService}
                                onItemChange={handleServiceChange}
                            />
                        </Col>
                        <Col span={10} xs={24} lg={12} style={{ textAlign: '-webkit-center' }}>
                            <SectorServiceItem
                                data={services.slice(Math.ceil(services.length / 2))}
                                selectedItemId={selectedService}
                                onItemChange={handleServiceChange}
                            />
                        </Col>
                    </Row> 
                </Col>
                <Col span={24} style={{ display: 'flex', justifyContent: 'end', paddingBottom: 30 }}>
                    <ConfirmButton disabled={!selectedSector || !selectedService} onClick={() => handleNextClick()} color={'black'} text={'Confirm Selection'}/>  
                </Col>                
            </Row>
        </>
    );
}

export default SectorServices;