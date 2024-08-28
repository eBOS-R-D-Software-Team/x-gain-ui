import React from 'react';
import { Table, ConfigProvider } from 'antd';
import { technologyMixesColumns } from '../../Data/TableColumnsData';

const TechnologyMixesTable = ({items, onRowClick}) => {
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
                columns={technologyMixesColumns} 
                dataSource={items.map(item => ({ ...item, key: item.Sol_ID }))} 
                pagination={false} 
                bordered  
                size='middle' 
                scroll={{ x: 800 }} 
                onRow={onRowClick}
            />    
        </ConfigProvider>
    )
}

export default TechnologyMixesTable;