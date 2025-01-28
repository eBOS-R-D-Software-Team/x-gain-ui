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
            tools: Array.isArray(edgeEnablersData?.[0]) ? edgeEnablersData[0].slice(0,-1).join(', ') : '',
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
            tools: edgeEnablersData?.[2]?.End_dev_information?.Number?.[0] && edgeEnablersData?.[2]?.End_dev_information?.Type?.[0]
                ? `${edgeEnablersData[2].End_dev_information.Number[0]}x ${edgeEnablersData[2].End_dev_information.Type[0]}`
                : '',
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


export const mergeDevicesData = (devicesArray) => {
    if (!Array.isArray(devicesArray)) {
        return {
            type: "string",
            result: [], // Return an empty structure if input is invalid
        };
    }

    const mergedResult = [];
    const type = "string";

    devicesArray.forEach(device => {
        if (device && Array.isArray(device.result)) {
            device.result.forEach((value, index) => {
                if (!mergedResult[index]) {
                    mergedResult[index] = 0; // Initialize if not already set
                }
                // Combine results by merging non-zero values or keeping existing ones
                mergedResult[index] = value !== 0 ? value : mergedResult[index];
            });
        }
    });

    return {
        dev_per_type: {
            type,
            result: mergedResult,
        }
    }
};


export const updateDevicesInStorage = (currentDevice, count, setNewDevicesPerType) => {
    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    const existingDeviceIndex = devices.findIndex(device => device.counter === count);

    if (existingDeviceIndex !== -1) {
        devices[existingDeviceIndex] = currentDevice; // Replace existing
    } else {
        devices.push(currentDevice); // Add new device
    }

    localStorage.setItem('devices', JSON.stringify(devices));
    // Automatically update newDevicesPerType state
    const mergedResult = mergeDevicesData(devices);

    if (setNewDevicesPerType) {
        setNewDevicesPerType(mergedResult.dev_per_type);
    }

    return mergedResult.dev_per_type;
};