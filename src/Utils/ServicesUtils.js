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


export const addDevicesInStorage = (currentDevice, count, setNewDevicesPerType) => {
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


export const getDevicesFromStorage = (removeLastDevice, setNewDevicesPerType, setCount) => {
    let cachedDevices = null;
    let mergedResult;
    if (!cachedDevices) {
        cachedDevices = JSON.parse(localStorage.getItem('devices')) || [];

        if (removeLastDevice && cachedDevices.length > 0) {
            cachedDevices = cachedDevices.slice(0, -1); // Create a new array without the last item
            localStorage.setItem('devices', JSON.stringify(cachedDevices)); // Save updated array

            //Decrement the count
            setCount((prev) => Math.max(prev - 1, 0));  
        }

        mergedResult = mergeDevicesData(cachedDevices);
                    
        console.log('mergedResult', mergedResult?.dev_per_type)
        setNewDevicesPerType(mergedResult?.dev_per_type); // Update state with merged result
    }
    return mergedResult;
};


export const returnUpdatedFormData = (fun, prevFormData, key, updateValues, setNewDevicesPerType) => {
    let updatedData;
    
    switch (fun) {
        case 'handleChoicesInputFunction': 
            const devicesArray = getDevicesFromStorage(false, setNewDevicesPerType);
            
            updatedData = {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    dev_per_type: devicesArray.dev_per_type,
                    [key]: {
                        ...prevFormData.initData[key],
                        ...updateValues
                    },
                },
                data: {
                    ...prevFormData.data,
                    dev_per_type: devicesArray.dev_per_type,
                    [key]: {
                        ...prevFormData.data[key],
                        ...updateValues
                    },
                },
            };
            
            if (key === 'dev_per_type') {
                addDevicesInStorage(updatedData.initData[key], updateValues.counter, setNewDevicesPerType);
            }
            break;

        case 'handleCheckboxFunction':
            updatedData = {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    [key]: {
                        ...prevFormData.initData[key],
                        result: updateValues.result || []
                    }
                },
                data: {
                    ...prevFormData.data,
                    [key]: {
                        ...prevFormData.data[key],
                        result: updateValues.result || []
                    }
                }
            }
            break;

        case 'handleNewDeviceFunction':
            updatedData = {
                ...prevFormData,
                initData: {
                    ...prevFormData.initData,
                    dev_per_type: {
                        ...prevFormData.initData['dev_per_type'],
                        ...updateValues
                    },
                },
                data: {
                    ...prevFormData.data,
                    dev_per_type: {
                        ...prevFormData.data['dev_per_type'],
                        ...updateValues
                    },
                },
            };
            break;

        default:
            updatedData = prevFormData; // Default case to return unchanged form data
            break;
    }
    
    return updatedData;
};
