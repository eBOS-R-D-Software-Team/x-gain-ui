import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Button, Spin } from 'antd';
import { getJsonFromLocalStorage } from '../Data/Api';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels } from '../Data/Data';
import ImpactWeightItem from '../Components/ImpactWeightItem';

const ImpactAssessment = () => {
    const navigate = useNavigate();

    const [technologicalValue, setTechnologicalValue] = useState(3);
    const [economicValue, setEconomicValue] = useState(3);
    const [environmentalValue, setEnvironmentalValue] = useState(3);
    const [loading, setLoading] = useState(false);
    const [highestSolItems, setHighestSolItems] = useState([]);

    useEffect(() => {
        const data = getJsonFromLocalStorage('iccs_response');
        console.log('iccs', data);

        if (data && data.results) {
            // Iterate through each result in the results object
            Object.keys(data.results).forEach((key) => {
                const result = data.results[key];
                
                // Assign the value of "Technology_score" to a new key "RankTotalScore"
                result.RankTotalScore = result.Technology_score * technologicalValue;
            });

            // Get top 3 items based on RankTotalScore
            const highestSolutions = Object.values(data.results)
                .sort((a, b) => b.RankTotalScore - a.RankTotalScore) // Sort descending
                .slice(0, 3); // Take top 3

            setHighestSolItems(highestSolutions);

            // Save the updated object back to localStorage
            localStorage.setItem('iccs_response', JSON.stringify(data));
        }
    }, [technologicalValue]);


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
                            icon={stepsLabels[4].icon} 
                            subicon={stepsLabels[4].subicon} 
                            title={stepsLabels[4].title} 
                            subtitle={stepsLabels[4].subtitle}
                            level={2} 
                            color={'#00678A'}
                        />
                    </Col>
                </Row>
                <Row gutter={[32, 16]} style={{ background: "rgba(0, 44, 60, 0.10)", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '10px', margin: '30px 20px', borderRadius: 10}}>
                    <Col span={24} style={{ color: "rgb(0, 103, 138)", fontSize: "24px", fontWeight: "600", marginBottom: "40px"}}>
                        Please move the sliders to assign importance weights to each impact indicator below for the assessment. Please keep the sum of weights to 9.
                    </Col>
                    <ImpactWeightItem title={'Technological'} value={technologicalValue} onChange={handleChangeTechnological} />
                    <ImpactWeightItem title={'Economic'} value={economicValue} onChange={handleChangeEconomic} />
                    <ImpactWeightItem title={'Environmental'} value={environmentalValue} onChange={handleChangeEnvironmental} />               
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '30px 20px'}}>
                    <Col span={24}>
                        <Button
                            type="primary"
                            //disabled={disabled}
                            onClick={() => handleResults()}
                            style={{
                                backgroundColor: '#016989',
                                borderColor: '#016989',
                                color: '#FFF',
                                padding: '30px 20px',
                                fontSize: '18px',
                                fontWeight: 700,
                                borderRadius: '6px'
                            }}
                        >
                            Compute Results
                        </Button>      
                    </Col>
                </Row>
            </Layout>
        </Spin>
    );
};

export default ImpactAssessment;
