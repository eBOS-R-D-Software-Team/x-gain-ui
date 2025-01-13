import React from 'react';
import { Avatar, Tooltip, Checkbox } from 'antd';

const MultiSectorItem = ({ data, selectedItemId, onItemChange  }) => {
    return (
        <div style={{ textAlign: '-webkit-center' }}>
            {data.map((item) => (
                <Tooltip
                    key={item.id}
                    title={item.tooltip}
                    placement="top"
                >
                    <div
                        style={{
                            width: '80%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px',
                            border: '1px solid #ccc',
                            marginBottom: '8px',
                            borderRadius: '4px',
                            backgroundColor: item.isActive ? 'rgba(0, 103, 138, 0.89)' : 'rgba(0, 103, 138, 0.33)',
                        }}
                        key={item.id}
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={`/images/sector-icons/${item.icon}`} style={{ marginRight: '8px' }} size={'medium'} />
                            <span style={{ color: "white", marginLeft: '10px', fontWeight: '700', lineHeight: '15px', fontSize: '18px' }}>{item.text}</span>
                        </div>
                        <Checkbox 
                            onChange={(e) => onItemChange(e, item.id)}
                            checked={Array.isArray(selectedItemId) && selectedItemId.includes(item.id)}
                            disabled={!item.isActive || (Array.isArray(selectedItemId) && selectedItemId.length >= 2 && !selectedItemId.includes(item.id))} 
                        />
                    </div>
                </Tooltip>
            ))}
        </div> 
    );
}

export default MultiSectorItem;