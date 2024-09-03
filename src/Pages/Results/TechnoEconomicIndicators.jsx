import React, {useState, useEffect} from 'react';

function TechnoEconomicIndicators() {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const savedData = localStorage.getItem('filteredSolutionAnalysisDataBySol');
        if (savedData) {
          setFormData(JSON.parse(savedData));
        }
    }, []);
    
    console.log(formData);

    return(
        <h1>Techno Economic Indicators</h1>
    )
}

export default TechnoEconomicIndicators;