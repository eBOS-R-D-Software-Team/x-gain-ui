import React from "react";
import { Table, Typography } from "antd";
import { EnvironmentalCountriesSolarColumns } from "../../Data/TableColumnsData";
import { countriesSolarData } from "../../Data/EnvironmentalCountriesSolarData";

const { Title } = Typography;

const CountriesSolarElectricityModal = () => {
    return (
        <>
            <Table 
                columns={EnvironmentalCountriesSolarColumns} 
                dataSource={countriesSolarData} 
                pagination={{ pageSize: 5 }} 
                bordered  
                size='middle' 
                scroll={{ x: 800 }}  
                rowKey="eu_countries" 
                rowHoverable={false}
                rowClassName={(_, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-white')}
                components={{
                    header: {
                        cell: (props) => (
                            <th {...props} className="environmental-table-group">{props.children}</th>
                        ),
                    },
                }}
            />  
            <Title level={5} style={{ padding: '2px', fontWeight: 400, borderRadius: '10px', color: 'rgb(145 143 143)', margin: 0, textAlign: 'center' }}>                                       
                More information on your current electricity source mix: overview of the share of renewable energy, carbon intensity (CO₂ emissions per kWh), and the proportion of low-carbon sources, among other details: <br/>
                <a style={{ color: '#15728F' }} href="https://app.electricitymaps.com/zone/NL/all/yearly" target="_blank" rel="noreferrer">https://app.electricitymaps.com/zone/NL/all/yearly</a>                                      
            </Title>  
        </>
    );
};

export default CountriesSolarElectricityModal;
