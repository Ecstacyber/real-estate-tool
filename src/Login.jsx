import React, { useState } from 'react';
import { Layout, Button, Input, Form, Checkbox, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

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

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
    // fetch login API
    localStorage.setItem('user', values.username);
    navigate('../');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider style={siderStyle}>
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
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                    display: 'inline-block',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập username',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Hãy nhập mật khẩu',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Nhớ mật khẩu</Checkbox>
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Đăng nhập
                    </Button>
                </Form.Item>
              </Form>
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

export default Login;