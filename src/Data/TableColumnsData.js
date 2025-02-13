import { Tooltip } from 'antd';
import { tooltips } from './Data';
import { InfoCircleOutlined } from '@ant-design/icons';


export const technologyMixesColumns = (data) => [
    {
        title: '#',
        key: 'Sol_ID',
        width: 50,
        className: 'technology-table-group',
        onCell: (record) => ({
            rowSpan: record.rowSpanIndex, // Dynamically merging rows
        }),
        render: (text, record) => record.displayIndex, 
    },
    {
        title: (
            <Tooltip title={tooltips.networksmixes.description}>
                Networks  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
            </Tooltip>
        ),
        className: 'technology-table-group',
        children: [
            {
                title: (
                    <Tooltip title={tooltips.accessmixes.description}>
                        Access Connectivity  <InfoCircleOutlined style={{ marginLeft: 1, fontSize: 17, color: "#ffffff" }} />
                    </Tooltip>
                ),
                dataIndex: ['Connectivity_information', 'NetsAccessUser'], // Access nested array
                key: 'connectivityNets',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanAccessNetsUserData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['Connectivity_information', 'NetsAccessNumber'],
                key: 'no1',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanAccessNetsNumberData, // Dynamically merging rows
                }),
            },
            {
                title: (
                    <Tooltip title={tooltips.localmixes.description}>
                        Local Connectivity  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
                    </Tooltip>
                ),
                key: 'localConnectivity',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanLocalNetsUserData, // Dynamically merging rows
                }),
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links;
                    const netsValue = linksLength === 2 
                        ? null
                        : record.Connectivity_information.NetsLocalUser;
                    
                    return netsValue;
                },
            },
            {
                title: 'No',
                key: 'no2',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanLocalNetsNumberData, // Dynamically merging rows
                }),
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links;
                    const netsValue = linksLength === 2 
                        ? null
                        : record.Connectivity_information.NetsLocalNumber;
                    
                    return netsValue;
                },
            },
            {
                title: (
                    <Tooltip title={tooltips.publicInternetmixes.description}>
                        (Public) Internet Connectivity  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
                    </Tooltip>
                ),
                key: 'internetConnectivity',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanInternetNetsUserData, // Dynamically merging rows
                }),
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links;
                    const netsValue = linksLength === 2 
                        ? record.Connectivity_information.NetsLocalUser
                        : record.Connectivity_information.NetsInternetUser;
                    
                    return netsValue;
                },
            },
            {
                title: 'No',
                key: 'no3',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanInternetNetsNumberData, // Dynamically merging rows
                }),
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links;
                    const netsValue = linksLength === 2 
                        ? record.Connectivity_information.NetsLocalNumber
                        : record.Connectivity_information.NetsInternetNumber
                    
                    return netsValue;
                },
            },
            {
                title: 'Notes',
                key: 'warning',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanIndex, // Dynamically merging rows
                }),
                render: (text, record) => {
                    const disclaimer = record.Connectivity_information.Disclaimer;
                    return disclaimer.join(', ');
                },
            },
       ],
    },
    {
        title: (
            <Tooltip title={tooltips.processingEnablersmixes.description}>
                Processing Enablers  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
            </Tooltip>
        ),
        className: 'technology-table-group',
        children: [
            {
                title: 'Extreme',
                dataIndex: ['Processing_information', 'ProcessExtremeUser'],
                key: 'extreme',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanExtremeProcessingData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'ProcessExtremeNumber'],
                key: 'noExtreme',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanExtremeProcessingNumberData, // Dynamically merging rows
                }),
            },
            {
                title: 'Far',
                dataIndex: ['Processing_information', 'ProcessFarUser'],
                key: 'far',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanFarProcessingData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'ProcessFarNumber'],
                key: 'noFar',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanFarProcessingNumberData, // Dynamically merging rows
                }),
            },
            {
                title: 'Near',
                dataIndex: ['Processing_information', 'ProcessNearUser'],
                key: 'near',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanNearProcessingData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'ProcessNearNumber'],
                key: 'noNear',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanNearProcessingNumberData, // Dynamically merging rows
                }),
            },
            {
                title: 'Cloud',
                dataIndex: ['Processing_information', 'ProcessCloudUser'],
                key: 'cloud',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanCloudProcessingData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'ProcessCloudNumber'],
                key: 'noCloud',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanCloudProcessingNumberData, // Dynamically merging rows
                }),
            },
        ],
    },
    {
        title: 'End-devices',
        className: 'technology-table-group',
        children: [
            {
                title: 'Type',
                dataIndex: ['End_dev_information', 'Type'],
                key: 'endDevices',
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanEndDevTypeData, // Dynamically merging rows
                }),
            },
            {
                title: 'No',
                dataIndex: ['End_dev_information', 'Number'],
                key: 'noDevices',
                width: 50,
                className: 'technology-table-child',
                onCell: (record) => ({
                    rowSpan: record.rowSpanEndDevNumberData, // Dynamically merging rows
                }),
            },
        ]
    },
];


export const totalCapexOpexColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        className: 'totalLabel'
    },
    {
        dataIndex: 'value',
        key: 'value',
        render: (value) => value,
        //render: (value) => value.toLocaleString('en-US', { minimumFractionDigits: 2 }),
    }, 
];


export const EnvironmentalTableColumns = [
    {
        title: 'Tools List',
        dataIndex: 'tools',
        key: 'tools',
    },
    {
        title: (
            <Tooltip title={tooltips.carbonFootprint.description}>
                Carbon Footprint (kg of CO₂ equivalent)  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
            </Tooltip>
        ),
        dataIndex: 'Carbon',
        key: 'Carbon',
    },
    {
        title: (
            <Tooltip title={tooltips.impactOnHumanHealth.description}>
                Impact on Human Health (DALY)  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
            </Tooltip>
        ),
        dataIndex: 'Impact',
        key: 'Impact',
    },
    {
        title: (
            <Tooltip title={tooltips.biodiversityfootprint.description}>
                Biodiversity Footprint (PDF)  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
            </Tooltip>
        ),
        dataIndex: 'Biodiversity',
        key: 'Biodiversity',
    },
];


export const EnvironmentalCarbonFootprintColumns = [
    {
        dataIndex: 'name',
        key: 'name',
        className: 'totalLabel'
    },
    {
        dataIndex: 'value',
        key: 'value',
        render: (value) => value,
        //render: (value) => value.toLocaleString('en-US', { minimumFractionDigits: 2 }),
    }, 
];