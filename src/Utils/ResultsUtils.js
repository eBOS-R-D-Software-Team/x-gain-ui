export const processPieChartData = (data) => {
    const chartData = [['Category', 'Amount']];
    for (const [key, value] of Object.entries(data)) {
        // Only push valid entries with non-null, non-undefined values
        if (key && value !== undefined && value !== null) {
            chartData.push([key.replace(/_/g, ' '), value]);
        }
    }
    return chartData;
};


export const processColumnChartData = (periodsExist, capexDataExist, periods, categoryDataTS, label) => {
    if (!periodsExist || !capexDataExist) return [['Year']];

    return [
        ['Year', ...Object.keys(categoryDataTS || {})],  // Column headers: Year and categories
        ...periods?.map((period, periodIndex) => {
            const row = [period.label]; // Start with the year label
            Object.keys(categoryDataTS || {}).forEach((key) => {
                row.push(categoryDataTS[key][periodIndex] || 0);  // Push corresponding category data
            });
            return row;
        })
    ];
};

export const renderBulletedList = (content) => {
    if (!content) {
        return null; // Return nothing if content is undefined or null
    }
    
    return content.split('\n').map((item, index) => (
        <li key={index}>{item}</li>
    ));
};


export const formatDecimalNumber = (num) => {
    return num !== null && num !== undefined ? num.toFixed(2) : '0.00';
};


export const formatExponentialNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num)) {
        return '';
    }

    if(num !== 0) {
        const formatted = num.toExponential(2);
        return formatted;
    }
    return 0;
}


export const environmentalTools = (edgeEnablersData, environmentalData) => {
    return [
        {
            key: '1',
            tools: Array.isArray(edgeEnablersData?.[0]) ? edgeEnablersData[0].join(', ') : '',
            Carbon: formatExponentialNumber(parseFloat(environmentalData?.cO2FPrNetw) || 0),
            Impact: formatExponentialNumber(parseFloat(environmentalData?.healtImpNetw) || 0),
            Biodiversity: formatExponentialNumber(parseFloat(environmentalData?.biodivFPrNetw) || 0),
        },
        {
            key: '2',
            tools: Array.isArray(edgeEnablersData?.[1]) ? edgeEnablersData[1].join(', ') : '',
            Carbon: formatExponentialNumber(parseFloat(environmentalData?.cO2FPrEnabl) || 0),
            Impact: formatExponentialNumber(parseFloat(environmentalData?.healtImpEnabl) || 0),
            Biodiversity: formatExponentialNumber(parseFloat(environmentalData?.biodivFPrEnabl) || 0),
        },
        {
            key: '3',
            tools: Array.isArray(edgeEnablersData?.[3]) ? edgeEnablersData[3].join(', ') : '',
            Carbon: formatExponentialNumber(parseFloat(environmentalData?.cO2FPrEUD) || 0),
            Impact: formatExponentialNumber(parseFloat(environmentalData?.healtImpEUD) || 0),
            Biodiversity: formatExponentialNumber(parseFloat(environmentalData?.biodivFPrEUD) || 0),
        }
    ]
}


export const formatDescription = (text) => {
    return text.split("\n").map((line, index) => {
        // Check if the line contains a title (wrapped in quotes)
        if (line.trim().startsWith('"') && line.trim().endsWith('"')) {
            const title = line.replace(/"/g, '').trim(); // Remove quotes
            return <p key={index}><b>{title}</b></p>;
        } else if (line.trim().startsWith('-')) {
            // Handle description lines starting with "-"
            return <p key={index} style={{ marginLeft: '20px' }}>{line.trim()}</p>;
        }
        return null; // Ignore empty lines
    });
};

export const getConnectivityProcessingEnablers = (data, numbers) => {
    return data.map((record, index) => {
        const number = numbers[index];

        if (number === undefined || !record) {
            return null;
        }

        return `${number}x ${record}`;
    }).filter(item => item !== null);
}