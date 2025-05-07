import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChartData = ({ data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: -2,
                suggestedMax: 2,
                ticks: {
                    stepSize: 1,
                    backdropPadding: 4, // Padding around the tick labels
                    z: 1, 
                    font: {
                        size: 16, // Set the font size for tick labels
                        weight: 'bold', // Set the font weight for tick labels
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return(
        <div style={{ width: '100%', height: '600px' }}>
            <Radar data={data} options={options} />
        </div>
    )
}

export default RadarChartData;