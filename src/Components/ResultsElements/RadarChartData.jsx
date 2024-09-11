import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChartData = ({ data }) => {
    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: -3,
                suggestedMax: 3,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return(
        <Radar data={data} options={options} />
    )
}

export default RadarChartData;