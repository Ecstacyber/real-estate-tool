import { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import './index.css'
import navItems from './NavItems';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Header, Content, Footer, Sider } = Layout;

const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

const LogDetails = () => {
    const dataSource = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }} hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical"></div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} items={navItems} />
            </Sider>
            <Layout
                style={{
                    marginInlineStart: 200,
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            textAlign: 'center',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Typography>
                            <h3 style={{textAlign: 'left'}}>
                                0240902_130000_cronjob
                            </h3>
                            <div style={{textAlign: 'left'}}>
                                {dataSource}
                            </div>
                        </Typography>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Real Estate Tool ©{new Date().getFullYear()} - Created by Blue Team
                </Footer>
            </Layout>
        </Layout>
    );
}

export default LogDetails;