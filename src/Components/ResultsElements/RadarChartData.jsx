import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChartData = ({ data }) => {

    const wrapTooltipText = (text, maxLineLength = 60) => {
        const lines = [];
        let current = text;
        while (current.length > maxLineLength) {
            const breakIndex = current.lastIndexOf(" ", maxLineLength);
            const index = breakIndex > 0 ? breakIndex : maxLineLength;
            lines.push(current.slice(0, index));
            current = current.slice(index).trim();
        }
        if (current.length > 0) lines.push(current);
        return lines;
    };

    
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
            tooltip: {
                callbacks: {
                label: function (context) {
                    const score = context.raw;
                    const index = context.dataIndex;
                    const tooltipText = context.dataset.tooltips?.[index] || '';
                    const wrapped = wrapTooltipText(tooltipText, 60);
                    return [`Score: ${score}`, ...wrapped];
                }
            },
            boxWidth: 10,
            boxHeight: 10,
            padding: 10,
            },
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