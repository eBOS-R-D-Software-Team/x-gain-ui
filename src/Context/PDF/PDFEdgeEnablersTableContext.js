import React, { createContext, useContext } from 'react';
import 'jspdf-autotable';

// Create the context
const PDFEdgeEnablersTableContext = createContext();

const flattenArray = (arr) => {
    return arr.flatMap(item => Array.isArray(item) ? item : [item]);
};

const joinArray = (arr) => {
    return Array.isArray(arr) ? arr.join(', ') : arr;
};

function getCombinedProcessingData(data, nums) {
    console.log(data, nums)
    return data.map((processes, index) => {
        const numbers = nums[index];
        
        if (processes.length === 0 && numbers.length === 0) return '';

        const combinedItems = processes.map((process, i) => {
            const number = numbers[i] !== undefined ? numbers[i] + 'x ' : '';
            return number + process;
        });

        return combinedItems.join(', ');
    });
}

function getCombinedEndDevData(data, nums) {
    const numbers = nums;
    
    if (data.length === 0 && numbers.length === 0) return '';

    const combinedItems = data.map((device, i) => {
        const number = numbers[i] !== undefined ? numbers[i] + 'x ' : '';
        return number + device;
    });

    return combinedItems.join(', ');
}

// Provide the context to the entire app
export const PDFEdgeEnablersTableProvider = ({ children }) => {

    const handleExportEdgeEnablersTable = ({ doc, data, startY }) => {  
        const validData = Object.values(data);
 
        const parentColumns = [
            { title: 'Networks', colSpan: 3 },
            { title: 'Edge Enablers', colSpan: 4 },
            { title: 'End-devices', colSpan: 1 },
        ];

        const childColumns  = [
            { title: 'Access', key: 'connectivityNets' },
            { title: 'Local', key: 'localConnectivity' },
            { title: '(Public) Internet', key: 'internetConnectivity' },
            { title: 'Extreme', key: 'extreme' },
            { title: 'Far', key: 'far' },
            { title: 'Near', key: 'near' },
            { title: 'Cloud', key: 'cloud' },
            { title: 'Type', key: 'endDevices' },
        ];

    
        // Prepare table body
        const body = validData.map(record => {    
            const netsNumbers = flattenArray(record.Connectivity_information?.Number || []);
            const netsData = flattenArray(record.Connectivity_information?.Nets_User || []).map(joinArray);

            const processingExtremeNumbers = flattenArray(record.Processing_information?.Number[0] || []);
            const processingFarNumbers = flattenArray(record.Processing_information?.Number[1] || []);
            const processingNearNumbers = flattenArray(record.Processing_information?.Number[2] || []);
            const processingCloudNumbers = flattenArray(record.Processing_information?.Number[3] || []);

            const endDevicesNumbers = flattenArray(record.End_dev_information.Number || []);

            const combinedProcessingData = getCombinedProcessingData(record.Processing_information.Process_Dev_per_layer_User, record.Processing_information.Number);
            const combinedEndDecivesData = getCombinedEndDevData(record.End_dev_information.Type, record.End_dev_information.Number);

            return [
                (netsNumbers[0] ? netsNumbers[0] + 'x ' : '') + (netsData[0] ?? ''), 
                record.Connectivity_information?.Links?.length === 2 
                    ? null 
                    : (netsNumbers[1] ? netsNumbers[1] + 'x ' : '') + (netsData[1] ?? ''), // Local Connectivity
                record.Connectivity_information?.Links?.length === 2 
                    ? (netsNumbers[1] ? netsNumbers[1] + 'x ' : '') + (netsData[1] ?? '') 
                    : (netsNumbers[2] ? netsNumbers[2] + 'x ' : '') + (netsData[2] ?? ''), // (Public) Internet Connectivity
                (Array.isArray(processingExtremeNumbers) && processingExtremeNumbers?.length > 0 
                    ? combinedProcessingData[0] 
                    : ''), // Extreme              
                (Array.isArray(processingFarNumbers) && processingFarNumbers?.length > 0 
                    ? combinedProcessingData[1] 
                    : ''), // Far               
                (Array.isArray(processingNearNumbers) && processingNearNumbers?.length > 0 
                    ? combinedProcessingData[2] 
                    : ''), // Near
                (Array.isArray(processingCloudNumbers) && processingCloudNumbers?.length > 0 
                    ? combinedProcessingData[3] 
                    : ''), // Cloud
                (Array.isArray(endDevicesNumbers) && endDevicesNumbers?.length > 0 
                    ? combinedEndDecivesData 
                    : ''), // End-devices Type
            ];
        });
    
        // Generate the table in the PDF
        doc.autoTable({
            startY: startY,
            head: [
                parentColumns.map(col => ({ content: col.title, colSpan: col.colSpan, styles: { halign: 'center', fillColor: [21, 114, 143] } })),
                childColumns.map(col => ({ content: col.title, styles: { halign: 'center', textColor: 'black', fillColor: [139, 209, 192] } }))
            ],
            body: body,
            margin: {left: 10},
            theme: 'grid',
            bodyStyles: { halign: 'center' },
            headStyles: { halign: 'center' },
        });
    };
    
    return (
        <PDFEdgeEnablersTableContext.Provider value={{ handleExportEdgeEnablersTable }}>
            {children}
        </PDFEdgeEnablersTableContext.Provider>
    );
};

// Custom hook to use the PDF context
export const usePDFEdgeEnablersTableContext = () => useContext(PDFEdgeEnablersTableContext);
