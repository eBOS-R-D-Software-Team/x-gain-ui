import React from 'react';
import { Table, ConfigProvider } from 'antd';
import { technologyMixesColumns } from '../../Data/TableColumnsData';

const TechnologyMixesTable = ({items, onRowClick}) => {
    console.log('items', items)
    let maxRows = 0;

    const processDataForRowSpan = (data) => {
        const processedData = [];
        const groupMeta = {}; // Store metadata: maxRows and groupIndex
         let groupIndex = 0;

        data.forEach((record) => {
               const {
                Connectivity_information: { Nets_User = [], Number: ConnectivityNumber = [], Links, Disclaimer } = {},
                Processing_information: { Process_Dev_per_layer_User = [], Number: ProcessingNumber = [] } = {},
                End_dev_information: { Type = [], Number: EndDevNumber = [] } = {},
                Sol_ID
            } = record;

            const netsUserToArray = Nets_User.map(item => 
                Array.isArray(item) ? item : [item]
            );

            const connectivityNumberToArray = ConnectivityNumber.map(item => 
                Array.isArray(item) ? item : [item]
            );

           
            maxRows = Math.max(
                ...netsUserToArray.map(arr => arr.length),
                ...connectivityNumberToArray.map(arr => arr.length),
                ...Process_Dev_per_layer_User.map(arr => arr.length),
                ...ProcessingNumber.map(arr => arr.length),
                Type.length,
                EndDevNumber.length
            );

            
            groupMeta[Sol_ID] = { maxRows, groupIndex: groupIndex++ };

            const flags = {
                isAccessNetsUserLength: netsUserToArray[0]?.length <= 1,
                isLocalNetsUserLength: netsUserToArray[1]?.length <= 1,
                isInternetNetsUserLength: netsUserToArray[2]?.length <= 1,
                isAccessNetsNumberLength: connectivityNumberToArray[0]?.length <= 1,
                isLocalNetsNumberLength: connectivityNumberToArray[1]?.length <= 1,
                isInternetNetsNumberLength: connectivityNumberToArray[2]?.length <= 1,
                isExtremeProcessingLength: Process_Dev_per_layer_User[0]?.length <= 1,
                isFarProcessingLength: Process_Dev_per_layer_User[1]?.length <= 1,
                isNearProcessingLength: Process_Dev_per_layer_User[2]?.length <= 1,
                isCloudProcessingLength: Process_Dev_per_layer_User[3]?.length <= 1,
                isExtremeProcessingNumberLength: ProcessingNumber[0]?.length <= 1,
                isFarProcessingNumberLength: ProcessingNumber[1]?.length <= 1,
                isNearProcessingNumberLength: ProcessingNumber[2]?.length <= 1,
                isCloudProcessingNumberLength: ProcessingNumber[3]?.length <= 1,
                isTypeLength: Type?.length <= 1,
                isEndDevNumberLength: EndDevNumber?.length <= 1
            };


            for (let i = 0; i < maxRows; i++) {             
                processedData.push({
                    key: `${Sol_ID}-${i}`,
                    groupKey: Sol_ID,
                    groupIndex: groupMeta[Sol_ID].groupIndex,
                    rowIndexInGroup: i,
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
                        Type: Type[i] || [],
                        Number: EndDevNumber[i] || [],
                    },
                    displayIndex: i === 0 ? groupMeta[Sol_ID].groupIndex + 1 : '',
                    rowSpanIndex: i === 0 ? maxRows : 0,
                    rowSpanAccessNetsUserData: flags.isAccessNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanLocalNetsUserData: flags.isLocalNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanInternetNetsUserData: flags.isInternetNetsUserLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanAccessNetsNumberData: flags.isAccessNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanLocalNetsNumberData: flags.isLocalNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanInternetNetsNumberData: flags.isInternetNetsNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanExtremeProcessingData: flags.isExtremeProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanFarProcessingData: flags.isFarProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanNearProcessingData: flags.isNearProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanCloudProcessingData: flags.isCloudProcessingLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanExtremeProcessingNumberData: flags.isExtremeProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanFarProcessingNumberData: flags.isFarProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanNearProcessingNumberData: flags.isNearProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanCloudProcessingNumberData: flags.isCloudProcessingNumberLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanEndDevTypeData: flags.isTypeLength ? (i === 0 ? maxRows : 0) : 1,
                    rowSpanEndDevNumberData: flags.isEndDevNumberLength ? (i === 0 ? maxRows : 0) : 1
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
                rowClassName={(record) => {
                    const isEven = record.groupIndex % 2 === 0;
                    const isFirst = record.rowIndexInGroup === 0;
                    return `${isEven ? 'table-row-light' : 'table-row-dark'} ${isFirst ? 'bordered' : ''}`;
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