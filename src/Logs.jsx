import React from 'react';
import { Layout, Menu, theme } from 'antd';
import './index.css'
import navItems from './NavItems';

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

const Logs = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={navItems} />
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
};

export default Logs;