import React from 'react';
import { Chart } from "react-google-charts";

const ColumnChartData = ({ title, data }) => {
    const options = {
        isStacked: true,
        title: title,
        colors: ['#4285F4', '#EA4335', '#FF9900', '#109618'],  // Custom colors for the columns
    };

    return(
        <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    )
}

export default ColumnChartData;