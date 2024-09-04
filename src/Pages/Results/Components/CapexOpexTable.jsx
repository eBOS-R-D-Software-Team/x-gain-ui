import React from 'react';
import { Col } from 'antd';
import TechnoEconomicAssessmentTable from '../../../Components/ResultsElements/TechnoEconomicAssessmentTable';

const CapexOpexTable = ({title, data, periods, yearlyTotal, categoryTotal}) => {
    // Create columns based on periods
    const columns = periods ? [
        {
            title: title,
            dataIndex: 'category',
            key: 'category',
        },
        ...periods.map(period => ({
            title: period.label,
            dataIndex: period.label,
            key: period.id,
        })),
        ...(categoryTotal ? [{     
            title: 'Total',
            dataIndex: 'rowTotal',
            key: 'rowTotal',
            className: 'rowTotal'
        }] : [])
    ] : [];

    
    // Map capexData to the format expected by the table
    const dataSource = data ? Object.keys(data).map((key, index) => {
        const yearlyData = data[key];
        const rowData = {
            key: index,
            category: key,
        };
        
        periods.forEach((period, periodIndex) => {
            rowData[period.label] = yearlyData[periodIndex];
        });

        if (categoryTotal) {
        rowData['rowTotal'] = categoryTotal[key] !== null ? categoryTotal[key] : 0;
        }

        return rowData;
    }) : [];


    // Add the total row from data.TotalByCapexCol
    if (yearlyTotal && yearlyTotal.length > 0) {
        const totalRow = {
            key: 'total',
            category: 'Total',
        };

        periods.forEach((period, periodIndex) => {
            totalRow[period.label] = yearlyTotal[periodIndex] !== null ? yearlyTotal[periodIndex] : 0;
        });

        // Calculate the grand total for the row
        totalRow['rowTotal'] = yearlyTotal ? Object.values(yearlyTotal).reduce((total, value) => total + value, 0) : 0;
        
        dataSource.push(totalRow);
    }


    return(       
        <Col span={24} lg={12}>
            <TechnoEconomicAssessmentTable columns={columns} dataSource={dataSource}/>
        </Col>    
    )
}

export default CapexOpexTable;