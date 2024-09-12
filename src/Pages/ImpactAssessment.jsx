import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Button, Spin } from 'antd';
import { postSolutionsAnalysis } from '../Data/Api';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels } from '../Data/Data';
import ImpactWeightItem from '../Components/ImpactWeightItem';

const ImpactAssessment = () => {
    const navigate = useNavigate();

    const [technologicalValue, setTechnologicalValue] = useState(2);
    const [economicValue, setEconomicValue] = useState(2);
    const [environmentalValue, setEnvironmentalValue] = useState(2);
    const [loading, setLoading] = useState(false);
    const [highestSolItems, setHighestSolItems] = useState([]);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // if it is greater than 6 then the button will be disabled ( Technological and Economic and Environmental )
        const sumResults = technologicalValue + economicValue + environmentalValue
        if (sumResults <= 6){
            setDisabled(false)
        }
        else{
            setDisabled(true)
        }

        const fetchIccsResponseData = async () => {
            try {
                const data = JSON.parse(localStorage.getItem('iccs_response'));

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
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchIccsResponseData();

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
        setLoading(true);
        setTimeout(() => {
            //postSolutionsAnalysis();
            navigate('/technology-mixes', { state: { highestSolItems } });
        }, 5000);
    };


    return (
        <Spin spinning={loading} tip="Loading...">
            <Layout style={{ paddingTop: 10, backgroundColor: '#FFF', marginTop: 30, borderRadius: 20 }}>
                <Row gutter={[32, 16]}>
                    <Col span={24}>
                        <TitleForm 
                            icon={stepsLabels[5].icon} 
                            subicon={stepsLabels[5].subicon} 
                            title={stepsLabels[5].title} 
                            subtitle={stepsLabels[5].subtitle}
                            level={2} 
                            color={stepsLabels[5].color}
                        />
                    </Col>
                </Row>
                <Row gutter={[32, 16]} style={{ background: "rgba(0, 44, 60, 0.10)", boxShadow: "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)", padding: '10px', margin: '30px 20px', borderRadius: 10}}>
                    <Col span={24} style={{ color: "rgb(0, 103, 138)", fontSize: "24px", fontWeight: "600", marginBottom: "40px"}}>
                        Please move the sliders to assign importance weights to each impact indicator below for the assessment. <u><strong>Please keep the sum of weights to 6</strong> </u>.
                    </Col>
                    <ImpactWeightItem title={'Technological'} value={technologicalValue} onChange={handleChangeTechnological} />
                    <ImpactWeightItem title={'Economic'} value={economicValue} onChange={handleChangeEconomic} />
                    <ImpactWeightItem title={'Environmental'} value={environmentalValue} onChange={handleChangeEnvironmental} />               
                </Row>
                <Row gutter={[32, 16]} style={{ margin: '30px 20px'}}>
                    <Col span={24}>
                        <Button
                            type="primary"
                            disabled={disabled}
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
