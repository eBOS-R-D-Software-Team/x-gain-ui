import React from 'react';
import { Table, ConfigProvider } from 'antd';

const TechnoEconomicAssessmentTable = ({ columns, dataSource }) => {
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
                        headerBg: '#006187',
                        headerColor: '#FFF',
                        cellPaddingBlockMD: 2,
                    },
                },
            }}
        >
            {dataSource.length > 0 && (
                <Table 
                    columns={columns} 
                    dataSource={dataSource} 
                    pagination={false} 
                    bordered  
                    size='middle' 
                    scroll={{ x: 800 }} 
                    rowClassName={(record) => record.key === 'total' ? 'total-row' : ''}
                />    
            )}
        </ConfigProvider>
    )
}

export default TechnoEconomicAssessmentTable;