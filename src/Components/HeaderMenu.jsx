import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

const items = [
    {
        key: '1',
        label: <Link to="#">Load</Link>,
    },
    {
        key: '2',
        label: <Link to="#">Save</Link>,
        //icon: <PieChartOutlined />,
    },
];

const HeaderMenu = () => {
    return(
        <Layout style={{ backgroundColor: '#00A27B', minHeight: '100vh', paddingTop: 40}}>          
            <Header className="site-layout-background" style={{ backgroundColor: 'transparent'}}>
                <div className="header-content" style={{ height: '100%' }}>
                    <div className="left-navbar">
                        <img src='/images/icons/logo.png' alt="Logo" style={{cursor:'pointer'}}/>
                    </div>
                    <div className="right-navbar">
                        <Menu mode="horizontal" items={items} style={{ backgroundColor: 'transparent', border: 'none'}}/>
                    </div>
                </div>
            </Header>
            <Content
                style={{
                    // margin: '24px 16px',
                    padding: 36,
                    // background: '#F6FFF4',
                    minHeight: 280,
                }}
            >
                <Outlet />  {/* This is where the routed content will be rendered */}
            </Content>
        </Layout>
    )
}

export default HeaderMenu;