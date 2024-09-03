import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Button, Row, Statistic, Col } from 'antd';
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

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log(loggedInUser);
      setUser(loggedInUser);
    }
    else {
      navigate('/login');
    }
  }, [navigate])
  
  return (
    <Layout style={{ minHeight: '100vh' }} hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={navItems} />
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
            display: 'flex',
            justifyContent: 'right'
          }}
        >
          <div style={{ paddingLeft: '20px', textAlign: 'right'}}>
            <Button type='link'>Đăng xuất</Button>
          </div>
          <div style={{ paddingLeft: '20px', paddingRight: '20px', textAlign: 'right'}}>Xin chào {user}</div>          
        </Header>
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
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Số bất động sản hiện có" value={200} />
              </Col>
              <Col span={12}>
                <Statistic title="Giá trung bình" value={10500000000} />
              </Col>
            </Row>
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
export default App;