import React from 'react';
import { useLocation } from 'react-router-dom';

function SummaryResults() {
    const location = useLocation();
    const { data } = location.state || {};  // Retrieve the data passed from the previous component

    console.log('Received data:', data);

    return(
        <h1>Summary Results</h1>
    )
}

export default SummaryResults;