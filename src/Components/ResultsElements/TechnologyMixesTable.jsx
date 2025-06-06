import React from 'react';
import { Table, ConfigProvider } from 'antd';
import { technologyMixesColumns } from '../../Data/TableColumnsData';

const TechnologyMixesTable = ({items, onRowClick}) => {
    console.log('items', items)
    let maxRows = 0;

    const processDataForRowSpan = (data) => {
        const processedData = [];
        const solIdRowCounts = {};
        let displayIndex = 0;
              console.log('data', data)

        data.forEach((record) => {
            const { Nets_User, Number: ConnectivityNumber, Links, Disclaimer } = record.Connectivity_information || {};
            const { Process_Dev_per_layer_User, Number: ProcessingNumber } = record.Processing_information || {};
            const { Type, Number: EndDevNumber } = record.End_dev_information || {};

            const netsUserToArray = Nets_User.map(item => 
                Array.isArray(item) ? item : [item]
            );

            const connectivityNumberToArray = ConnectivityNumber.map(item => 
                Array.isArray(item) ? item : [item]
            );

            console.log(netsUserToArray.map(arr => arr.length))
            console.log(connectivityNumberToArray.map(arr => arr.length))
            console.log(Process_Dev_per_layer_User.map(arr => arr.length))
            console.log(ProcessingNumber.map(arr => arr.length))
           
            maxRows = Math.max(
                ...netsUserToArray.map(arr => arr.length),
                ...connectivityNumberToArray.map(arr => arr.length),
                ...Process_Dev_per_layer_User.map(arr => arr.length),
                ...ProcessingNumber.map(arr => arr.length),
                Type.length,
                EndDevNumber.length
            );

            
            if (!solIdRowCounts[record.Sol_ID]) {
                solIdRowCounts[record.Sol_ID] = 0;
            }     
            solIdRowCounts[record.Sol_ID] += maxRows;

            console.log(netsUserToArray[0].length)

            const isAccessNetsUserLength = (netsUserToArray[0]?.length <= 1);
            const isLocalNetsUserLength = (netsUserToArray[1]?.length <= 1);
            const isInternetNetsUserLength = (netsUserToArray[2]?.length <= 1);
            const isAccessNetsNumberLength = (connectivityNumberToArray[0]?.length <= 1);
            const isLocalNetsNumberLength = (connectivityNumberToArray[1]?.length <= 1);
            const isInternetNetsNumberLength = (connectivityNumberToArray[2]?.length <= 1);
            const isExtremeProcessingLength = (Process_Dev_per_layer_User[0]?.length <= 1);
            const isFarProcessingLength = (Process_Dev_per_layer_User[1]?.length <= 1);
            const isNearProcessingLength = (Process_Dev_per_layer_User[2]?.length <= 1);
            const isCloudProcessingLength = (Process_Dev_per_layer_User[3]?.length <= 1);
            const isExtremeProcessingNumberLength = (ProcessingNumber[0]?.length <= 1);
            const isFarProcessingNumberLength = (ProcessingNumber[1]?.length <= 1);
            const isNearProcessingNumberLength = (ProcessingNumber[2]?.length <= 1);
            const isCloudProcessingNumberLength = (ProcessingNumber[3]?.length <= 1);
            const isTypeLength = (Type?.length <= 1);
            const isEndDevNumberLength = (EndDevNumber?.length <= 1);


            for (let i = 0; i < maxRows; i++) {             
                processedData.push({
                    key: `${record.Sol_ID}-${i}`,
                    displayIndex: i === 0 ? ++displayIndex : "", // Only increase on first row of each Sol_ID
                    Sol_ID: record.Sol_ID, // Solution ID
                    Connectivity_information: {
                        NetsAccessUser: netsUserToArray[0]?.[i] || [],
                        NetsLocalUser: netsUserToArray[1]?.[i] || [],
                        NetsInternetUser: netsUserToArray[2]?.[i] || [],
                        NetsAccessNumber: connectivityNumberToArray[0]?.[i] || [],
                        NetsLocalNumber: connectivityNumberToArray[1]?.[i] || [],
                        NetsInternetNumber: connectivityNumberToArray[2]?.[i] || [],
                        Links: Links?.length || [],
                        Disclaimer: Disclaimer || []
                    },
                    Processing_information: {
                        ProcessExtremeUser: Process_Dev_per_layer_User[0]?.[i] || [],
                        ProcessFarUser: Process_Dev_per_layer_User[1]?.[i] || [],
                        ProcessNearUser: Process_Dev_per_layer_User[2]?.[i] || [],
                        ProcessCloudUser: Process_Dev_per_layer_User[3]?.[i] || [],
                        ProcessExtremeNumber: ProcessingNumber[0]?.[i] || [],
                        ProcessFarNumber: ProcessingNumber[1]?.[i] || [],
                        ProcessNearNumber: ProcessingNumber[2]?.[i] || [],
                        ProcessCloudNumber: ProcessingNumber[3]?.[i] || [],
                    },
                    End_dev_information: {
                        Type: Type[i] || [], // Handle missing values
                        Number: EndDevNumber[i] || [],
                    },
                    rowSpanIndex: i === 0 ? maxRows : 0, // Apply rowspan only on first row
                    rowSpanAccessNetsUserData: isAccessNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanLocalNetsUserData: isLocalNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanInternetNetsUserData: isInternetNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanAccessNetsNumberData: isAccessNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanLocalNetsNumberData: isLocalNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanInternetNetsNumberData: isInternetNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanExtremeProcessingData: isExtremeProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanFarProcessingData: isFarProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanNearProcessingData: isNearProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanCloudProcessingData: isCloudProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanExtremeProcessingNumberData: isExtremeProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanFarProcessingNumberData: isFarProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanNearProcessingNumberData: isNearProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanCloudProcessingNumberData: isCloudProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanEndDevTypeData: isTypeLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanEndDevNumberData: isEndDevNumberLength ? (i === 0 ? maxRows : 0) : 1
                });
            }
        });

        console.log(processedData)

        return processedData;
    };


    const processedData = processDataForRowSpan(items);

    
    return(
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1677ff', // Customize the primary color
                    controlHeight: 60,         // Customize the height of controls like Slider
                    colorPrimaryBorderHover: 'rgba(32,116,95,1)',
                },
                components: {
                    Table: {
                        headerBg: '#8BD1C0',
                        headerColor: '#141414',
                        cellPaddingBlockMD: 20,
                        headerBorderRadius: 20
                    },
                },
            }}
        >
            <Table 
                columns={technologyMixesColumns(items)} 
                dataSource={processedData}
                rowClassName={(_, index) => {
                    const group = Math.floor(index / maxRows);
                    const isOddGroup = group % 2 === 0 ? 'table-row-light' : 'table-row-dark';
                    const lightOrDark =  index % maxRows === 0 ? 'bordered' : '';
                    return `${lightOrDark} ${isOddGroup} no-hover-row`;
                }}
                rowHoverable={false}
                pagination={false} 
                bordered  
                size='middle' 
                scroll={{ x: 800 }} 
                onRow={onRowClick}
                className="technology_mixes_table"
            />    
        </ConfigProvider>
    )
}

export default TechnologyMixesTable;