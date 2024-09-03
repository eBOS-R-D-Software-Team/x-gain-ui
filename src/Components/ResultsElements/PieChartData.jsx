import React from 'react';
import { Col } from 'antd';
import { Chart } from "react-google-charts";

const PieChartData = ({ title, data }) => {
    const options = {
        title: {title},
        is3D: true,
        pieHole: 0.4,
        sliceVisibilityThreshold: 0, // Show all slices, regardless of size
        legend: { position: 'right' }, // Ensure the legend is visible
        chartArea: { width: '80%', height: '80%' }, // Adjust the chart area to make room for the legend
    };

    return(
        <Col span={24} style={{ marginTop: 20 }}>              
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
            />
        </Col>
    )
}

export default PieChartData;