import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Input, theme, Table, Space } from 'antd';
import {
  SearchOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [user, setUser] = useState(null);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setDataSource([...dataSource]);
  };

  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: '20240902_130000_cronjob'
    },
    {
      id: 2,
      name: '20240902_140000_cronjob'
    }
  ]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
              marginBottom: 8,
              display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
                width: 90,
            }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
                width: 90,
            }}
          >
            Đặt lại
          </Button>
          {/* <Button
          type="link"
          size="small"
          onClick={() => {
              confirm({
              closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
          }}
          >
          Lọc
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
                close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      key: "id",
      title: "STT",
      dataIndex: "id",
      width: '60px',
    },
    {
      key: "name",
      title: "Tên",
      dataIndex: "name",
      showSorterTooltip: {
          target: 'full-header',
      },
      sorter: (a, b) => a.name > b.name,
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('name'),
      onCell: (record) => {
        return {
          onClick: () => {
            navigate('./' + record.id);
          }
        }
      }
    },
  ];

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
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey={(record) => record.id}
              title={() => 'Danh sách các file log'}
              showSorterTooltip={{ target: 'sorter-icon' }}
            >
            </Table>
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