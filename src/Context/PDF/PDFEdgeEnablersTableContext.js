import React, { createContext, useContext } from 'react';
import 'jspdf-autotable';

// Create the context
const PDFEdgeEnablersTableContext = createContext();

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
            return [
                (record.Connectivity_information?.Number?.[0] ? record.Connectivity_information.Number[0] + 'x ' : '') + (record.Connectivity_information?.Nets_User?.[0] ?? ''), 
                record.Connectivity_information?.Links?.length === 2 
                    ? null 
                    : (record.Connectivity_information?.Number?.[1] ? record.Connectivity_information.Number[1] + 'x ' : '') + (record.Connectivity_information?.Nets_User?.[1] ?? ''), // Local Connectivity
                record.Connectivity_information?.Links?.length === 2 
                    ? (record.Connectivity_information?.Number?.[1] ? record.Connectivity_information.Number[1] + 'x ' : '') + (record.Connectivity_information?.Nets_User?.[1] ?? '') 
                    : (record.Connectivity_information?.Number?.[2] ? record.Connectivity_information.Number[2] + 'x ' : '') + (record.Connectivity_information?.Nets_User?.[2] ?? ''), // (Public) Internet Connectivity
                (Array.isArray(record.Processing_information?.Number) && record.Processing_information.Number[0]?.length > 0 
                    ? record.Processing_information.Number[0][0] + 'x ' 
                    : '') + (record.Processing_information?.Process_Dev_per_layer_User?.[0] ?? ''), // Extreme              
                (Array.isArray(record.Processing_information?.Number) && record.Processing_information.Number[1]?.length > 0 
                    ? record.Processing_information.Number[1][0] + 'x ' 
                    : '') + (record.Processing_information?.Process_Dev_per_layer_User?.[1] ?? ''), // Far               
                (Array.isArray(record.Processing_information?.Number) && record.Processing_information.Number[2]?.length > 0 
                    ? record.Processing_information.Number[2][0] + 'x ' 
                    : '') + (record.Processing_information?.Process_Dev_per_layer_User?.[2] ?? ''), // Near
                (Array.isArray(record.Processing_information?.Number) && record.Processing_information.Number[3]?.length > 0 
                    ? record.Processing_information.Number[3][0] + 'x ' 
                    : '') + (record.Processing_information?.Process_Dev_per_layer_User?.[3] ?? ''), // Cloud
                (record.End_dev_information?.Number?.[0] ? record.End_dev_information.Number[0] + 'x ' : '') + (record.End_dev_information?.Type?.[0] ?? ''), // End-devices Type
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
