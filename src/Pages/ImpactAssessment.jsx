import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Layout, Spin, message } from 'antd';
import TitleForm from '../Components/WizardElements/TitleForm';
import { stepsLabels } from '../Data/Data';
import ImpactWeightItem from '../Components/ImpactWeightItem';
import ConfirmButton from '../Components/WizardElements/ConfirmButton';

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
        else {
            message.error('The sum of weights should be smaller or equal than 6')
            setDisabled(true)
        }

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

                        // If a matching item is found, add a new key with the value from incResponse
                        if (economicScore) {
                            result.Economic_score = economicScore.value; // Add new key here
                        } else {
                            result.Economic_score = 0; // Handle the case where no matching item is found
                        }

                         // If a matching item is found, add a new key with the value from incResponse
                         if (environmentalScore) {
                            result.Environmental_score = environmentalScore.solutionScore; // Add new key here
                        } else {
                            result.Environmental_score = 0; // Handle the case where no matching item is found
                        }
                      
                        // Assign the value of "Technology_score" to a new key "RankTotalScore"
                        result.RankTotalScore = (result.Technology_score * technologicalValue) + (result.Economic_score * economicValue) + (result.Environmental_score * environmentalValue);
                    });

                    // Get top 3 items based on RankTotalScore
                    const highestSolutions = Object.values(iccsResponse.results)
                        .sort((a, b) => b.RankTotalScore - a.RankTotalScore) // Sort descending
                        .slice(0, 3); // Take top 3

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
                        <ConfirmButton
                            disabled={disabled}
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
