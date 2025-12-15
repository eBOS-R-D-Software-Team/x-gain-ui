import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Spin } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels , tooltips} from '../Data/Data';
import ImpactWeightItem from '../Components/ImpactWeightItem';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';

const ImpactAssessment = () => {
    const navigate = useNavigate();

    const [technologicalValue, setTechnologicalValue] = useState(2);
    const [economicValue, setEconomicValue] = useState(2);
    const [environmentalValue, setEnvironmentalValue] = useState(2);
    const [loading, setLoading] = useState(false);
    const [highestSolItems, setHighestSolItems] = useState([]);

    useEffect(() => {
        const technological = localStorage.getItem('Technologicalvalue')    
        const economic = localStorage.getItem('Economicvalue')  
        const environmental = localStorage.getItem('Environmentalvalue')              
        if (technological && economic && environmental ){            
            setTechnologicalValue(parseInt(technological))
            setEconomicValue(parseInt(economic))
            setEnvironmentalValue(parseInt(environmental))
            localStorage.removeItem('Technologicalvalue')     
            localStorage.removeItem('Economicvalue')     
            localStorage.removeItem('Environmentalvalue')        
        }  
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const iccsResponse = JSON.parse(localStorage.getItem('iccs_response'));
                const incResponse = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));
                const wrResponse = JSON.parse(localStorage.getItem('environmentalDataResponse'));

                if (iccsResponse && iccsResponse.results) {
                    // Iterate through each result in the results object
                    Object.keys(iccsResponse.results).forEach((key) => {
                        const result = iccsResponse.results[key];

                        // Find the corresponding item in incResponse by matching "id" with "Sol_ID"
                        const economicScore = incResponse.teranking.find(item => item.id === result.Sol_ID.toString());
                        const environmentalScore = wrResponse.find(item => item.solution === result.Sol_ID);

                        if (economicScore) {
                            result.Economic_score = economicScore.value; // Add new key here
                        } else {
                            result.Economic_score = 0;
                        }

                         if (environmentalScore) {
                            result.Environmental_score = environmentalScore.solutionScore; // Add new key here
                        } else {
                            result.Environmental_score = 0;
                        }
                      
                        // Assign the value of "Technology_score" to a new key "RankTotalScore"
                        result.RankTotalScore = (result.Technology_score * technologicalValue) + (result.Economic_score * economicValue) + (result.Environmental_score * environmentalValue);
                    });

                    // Get top 3 items based on RankTotalScore
                    const highestSolutions = Object.values(iccsResponse.results)
                        .sort((a, b) => b.RankTotalScore - a.RankTotalScore) // Sort descending
                        .slice(0, 10); // Take top 3

                    setHighestSolItems(highestSolutions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    }, [technologicalValue , economicValue , environmentalValue]);


    const handleChangeTechnological = (value) => {
        setTechnologicalValue(value);         
    };

    const handleChangeEconomic = (value) => {
        setEconomicValue(value); 
    };

    const handleChangeEnvironmental = (value) => {
        setEnvironmentalValue(value); 
    };

    const handleResults = () => {
        localStorage.setItem('Technologicalvalue',  JSON.stringify(technologicalValue));
        localStorage.setItem('Economicvalue',  JSON.stringify(economicValue));
        localStorage.setItem('Environmentalvalue',  JSON.stringify(environmentalValue));
        setLoading(true);
        setTimeout(() => {
            navigate('/technology-mixes', { state: { highestSolItems } });
        }, 5000);
    };


    return (
        <Spin spinning={loading} tip="Loading...">
            <Layout style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]}>
                    <Col span={24}>
                        <TitleForm 
                            icon={stepsLabels[6].icon} 
                            subicon={stepsLabels[6].subicon} 
                            title={stepsLabels[6].title} 
                            subtitle={stepsLabels[6].subtitle}
                            level={2} 
                            color={stepsLabels[6].color}
                            tooltips={tooltips.impactweightsInfoButton.description}
                        />
                    </Col>
                </Row>
                <Row gutter={[32, 16]} style={{ background: "rgba(0, 44, 60, 0.10)", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '10px', margin: '30px 20px', borderRadius: 10}}>
                    <Col span={24} style={{ color: "rgb(0, 103, 138)", fontSize: "24px", fontWeight: "600", marginBottom: "40px"}}>
                        Please move the sliders to assign importance weights to each impact indicator below for the assessment.
                    </Col>
                    <ImpactWeightItem title={'Technological'} tooltip={tooltips.technologicalInfoButton.description}  value={technologicalValue} onChange={handleChangeTechnological} />
                    <ImpactWeightItem title={'Economic'} tooltip={tooltips.economicInfoButton.description} value={economicValue} onChange={handleChangeEconomic} />
                    <ImpactWeightItem title={'Environmental'} tooltip={tooltips.environmentalInfoButton.description} value={environmentalValue} onChange={handleChangeEnvironmental} />               
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '30px 20px'}}>
                    <Col span={24}>
                        <ConfirmButton
                            disabled={false}
                            onClick={() => handleResults()}
                            color={'#016989'} 
                            text={'Compute Results'}
                        />       
                    </Col>
                </Row>
            </Layout>
        </Spin>
    );
};

export default ImpactAssessment;
