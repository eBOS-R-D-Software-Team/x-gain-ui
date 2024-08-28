export const technologyMixesColumns = [
    {
        title: '#',
        dataIndex: 'Sol_ID',
        key: 'Sol_ID',
        width: 50,
        className: 'technology-table-group',
    },
    {
        title: 'Networks',
        className: 'technology-table-group',
        children: [
            {
                title: 'Access Connectivity',
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
                title: 'Local Connectivity',
                dataIndex: ['Connectivity_information', 'Nets', 1],
                key: 'localConnectivity',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Connectivity_information', 'Number', 1],
                key: 'no2',
                width: 50,
                className: 'technology-table-child',
            },
            {
                title: '(Public) Internet \n Connectivity',
                dataIndex: ['Connectivity_information', 'Nets', 2],
                key: 'internetConnectivity',
                className: 'technology-table-child',
            },
            {
                title: 'No',
                dataIndex: ['Connectivity_information', 'Number', 2],
                key: 'no3',
                width: 50,
                className: 'technology-table-child',
            },
        ],
    },
    {
        title: 'Edge Enablers',
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
    {
        title: '*Warning',
        dataIndex: 'warning',
        key: 'warning',
        className: 'technology-table-child',
    },
];