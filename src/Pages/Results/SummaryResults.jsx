import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SummaryResults() {
    const location = useLocation();
    const { solutionData } = location.state || {};  // Retrieve the data passed from the previous component
    const [sectorServiceData, setSectorServiceData] = useState(null);
    const [solutionAnalysisData, setSolutionAnalysisData] = useState([]);
    const [filteredSolutionAnalysisData, setFilteredSolutionAnalysisData] = useState({});

    useEffect(() => {
        try {
            const storedSectorServiceData = JSON.parse(localStorage.getItem('sectorsServicesDetails'));
            const storedSolutionAnalysisData = JSON.parse(localStorage.getItem('solutionsAnalysisResponse'));

            setSectorServiceData(storedSectorServiceData);
            setSolutionAnalysisData(storedSolutionAnalysisData);
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
        }
    }, []);

    useEffect(() => {
        console.log('Solution data:', solutionData);
        console.log('Sector Service Data:', sectorServiceData);
        console.log('Solution Analysis data:', solutionAnalysisData);
        console.log('Filtered data:', filteredSolutionAnalysisData);

        const filteredData = solutionAnalysisData?.analysisResults?.find(item => item.id === solutionData?.Sol_ID.toString());
        setFilteredSolutionAnalysisData(filteredData);
    }, [solutionData, sectorServiceData, solutionAnalysisData, filteredSolutionAnalysisData]);

    return(
        <h1>Summary Results</h1>
    )
}

export default SummaryResults;