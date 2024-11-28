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
            tools: edgeEnablersData?.[0]?.join(', ') || [],
            Carbon: formatExponentialNumber(environmentalData?.cO2FPrEUD),
            Impact: formatExponentialNumber(environmentalData?.healtImpEUD),
            Biodiversity: formatExponentialNumber(environmentalData?.biodivFPrEUD),
        },
        {
            key: '2',
            tools: edgeEnablersData?.[1]?.join(', ') || [],
            Carbon: formatExponentialNumber(environmentalData?.cO2FPrNetw),
            Impact: formatExponentialNumber(environmentalData?.healtImpNetw),
            Biodiversity: formatExponentialNumber(environmentalData?.biodivFPrNetw),
        },
        {
            key: '3',
            tools: edgeEnablersData?.[2]?.End_dev_information.Number?.[0] + 'x ' + edgeEnablersData?.[2]?.End_dev_information.Type?.[0] || [],
            Carbon: formatExponentialNumber(environmentalData?.cO2FPrEnabl),
            Impact: formatExponentialNumber(environmentalData?.healtImpEnabl),
            Biodiversity: formatExponentialNumber(environmentalData?.biodivFPrEnabl),
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