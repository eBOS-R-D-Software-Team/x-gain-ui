import React from 'react';
import { Chart } from "react-google-charts";

const ColumnChartData = ({ title, data }) => {
    const options = {
        isStacked: true,
        title: title,
        colors: ['#4285F4', '#EA4335', '#FF9900', '#109618'],  // Custom colors for the columns
        legend: {
            position: "top",
            maxLines: 3,
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        }, 
        chartArea: {
            top: 80, // <-- Increase this to add space below the legend
            left: 60,
            right: 30,
            bottom: 60
        }
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