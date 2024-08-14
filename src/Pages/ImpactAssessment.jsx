import React, {useState, useEffect} from 'react';

const ImpactAssessment = () => {
    const [sectorsServicesLevelDetails, setSectorsServicesLevelDetails] = useState(null);
    const [sectorsServicesDetails, setSectorsServicesDetails] = useState(null);
    const [locationDetails, setLocationDetails] = useState(null);
    const [questionsData, setQuestionsData] = useState(null);

    useEffect(() => {
        const sectorsServicesLevelData = localStorage.getItem('sectorsServicesLevelDetails');
        if (sectorsServicesLevelData) {
            const parsedData = JSON.parse(sectorsServicesLevelData);
            setSectorsServicesLevelDetails(parsedData);
        }

        const sectorsServicesData = localStorage.getItem('sectorsServicesDetails');
        if (sectorsServicesData) {
            const parsedData = JSON.parse(sectorsServicesData);
            setSectorsServicesDetails(parsedData);
        }

        const locationsData = localStorage.getItem('locationDetails');
        if (locationsData) {
            const parsedData = JSON.parse(locationsData);
            setLocationDetails(parsedData);
        }

        const answers = localStorage.getItem('questionsFormData');
        if (answers) {
            const parsedData = JSON.parse(answers);
            setQuestionsData(parsedData);
        }
    }, []);

    // if (!locationDetails) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
        <h2>Impact Assessment</h2>
        
        </div>
    );
};

export default ImpactAssessment;
