import { Tooltip } from 'antd';
import { tooltips } from './Data';
import { InfoCircleOutlined } from '@ant-design/icons';


export const technologyMixesColumns = [
    {
        title: '#',
        key: 'Sol_ID',
        width: 50,
        className: 'technology-table-group',
        render: (text, record, index) => {
            return index + 1;
        },
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
                dataIndex: ['Connectivity_information', 'Nets', 0], // Access nested array
                key: 'connectivityNets',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Connectivity_information', 'Number', 0],
                key: 'no1',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: (
                    <Tooltip title={tooltips.localmixes.description}>
                        Local Connectivity  <InfoCircleOutlined style={{ marginLeft: 10, fontSize: 17, color: "#ffffff" }} />
                    </Tooltip>
                ),
                key: 'localConnectivity',
                className: 'technology-table-child',
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links.length;
                    const netsValue = linksLength === 2 
                        ? null
                        : record.Connectivity_information.Nets[1];
                    return netsValue;
                },
            },
            {
                title: 'No',
                //dataIndex: ['Connectivity_information', 'Number', 1],
                key: 'no2',
                width: 50,
                className: 'technology-table-child',
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links.length;
                    const netsValue = linksLength === 2 
                        ? null
                        : record.Connectivity_information.Number[1];
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
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links.length;
                    const netsValue = linksLength === 2 
                        ? record.Connectivity_information.Nets[1]
                        : record.Connectivity_information.Nets[2];
                    return netsValue;
                },
            },
            {
                title: 'No',
                key: 'no3',
                width: 50,
                className: 'technology-table-child',
                render: (text, record) => {
                    const linksLength = record.Connectivity_information.Links.length;
                    const netsValue = linksLength === 2 
                        ? record.Connectivity_information.Number[1]
                        : record.Connectivity_information.Number[2];
                    return netsValue;
                },
            },
            {
                title: 'Notes',
                key: 'warning',
                width: 50,
                className: 'technology-table-child',
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
                dataIndex: ['Processing_information', 'Process_Dev_per_layer', 0],
                key: 'extreme',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'Number', 0],
                key: 'noExtreme',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: 'Far',
                dataIndex: ['Processing_information', 'Process_Dev_per_layer', 1],
                key: 'far',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'Number', 1],
                key: 'noFar',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: 'Near',
                dataIndex: ['Processing_information', 'Process_Dev_per_layer', 2],
                key: 'near',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'Number', 2],
                key: 'noNear',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: 'Cloud',
                dataIndex: ['Processing_information', 'Process_Dev_per_layer', 3],
                key: 'cloud',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Processing_information', 'Number', 3],
                key: 'noCloud',
                width: 50,
                className: 'technology-table-child',
            },
        ],
    },
    {
        title: 'End-devices',
        className: 'technology-table-group',
        children: [
            {
                title: 'Type',
                dataIndex: ['End_dev_information', 'Type', 0],
                key: 'endDevices',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['End_dev_information', 'Number', 0],
                key: 'noDevices',
                width: 50,
                className: 'technology-table-child',
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