import React from 'react';
import { Chart } from "react-google-charts";

const PieChartData = ({ title, data }) => {
    const options = {
        title: title,
        is3D: true,
        pieHole: 0.4,
        sliceVisibilityThreshold: 0, // Show all slices, regardless of size
        legend: {
            position: "right",
            alignment: "top",
            textStyle: {
                color: "#233238",
                fontSize: 14,
            },
        }, // Ensure the legend is visible
        chartArea: { width: '80%', height: '80%' }, // Adjust the chart area to make room for the legend
    };

    return(
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"250px"}
        />
    )
}

export default PieChartData;