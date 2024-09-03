import React, { useState, useRef, useEffect } from 'react';
import { Layout, Menu, Button, Input, theme, Table, Modal, Space, Form, TimePicker } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import './index.css'
import navItems from './NavItems';
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

const RealEstateWebsites = () => {
  const [form] = Form.useForm();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addingWebsite, setAddingWebsite] = useState(null);
  const [addingLinkSelector, setAddingLinkSelector] = useState(null);
  const [editingWebsite, setEditingWebsite] = useState(null);
  const [editingLinkSelector, setEditingLinkSelector] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [formValues, setFormValues] = useState();
  const searchInput = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
      name: 'https://batdongsan.vn/',
      linkSelector: 'p'
    },
    {
      id: 2,
      name: 'https://nhadat24h.net/',
      linkSelector: 'a'
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
      onCell: (record) => {
        return {
          onClick: () => {
            navigate('./' + record.id);
          }
        }
      },
      width: '60px'
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
    {
      key: 'linkSelector',
      title: 'Link selector',
      dataIndex: 'linkSelector',
      hidden: true
    },
    {
      key: "action",
      title: "Hành động",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditWebsite(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteWebsite(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddWebsite = (record) => {
    setIsAdding(true);
    setAddingWebsite({ ...record });
  };

  const onDeleteWebsite = (record) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xoá website này?",
      okText: "Có",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((website) => website.id !== record.id);
        });
      },
    });
  };

  const onEditWebsite = (record) => {
    setIsEditing(true);
    setEditingWebsite({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingWebsite(null);
    setEditingLinkSelector(null);
  };

  const resetAdding = () => {
    setIsAdding(false);
    setAddingWebsite(null);
    setAddingLinkSelector(null);
  }

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setFormValues(values);
    setIsAdding(false);
  };

  const onCronjobChange = (time, timeString) => {
    console.log(time, timeString);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical"></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} items={navItems} />
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
              title={() => 'Danh sách các website đang theo dõi'}
              showSorterTooltip={{ target: 'sorter-icon' }}
            >
            </Table>
            <div style={{ textAlign: 'right', paddingBottom: '20px' }}>
              <Button type="primary" onClick={onAddWebsite}>Thêm website</Button>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: '20px' }}>
              <Button type="primary" style={{ background: "green" }}>Lấy dữ liệu</Button>
            </div>
            <div style={{ textAlign: 'left', paddingBottom: '20px' }}>
              <p>Đặt thời gian lấy dữ liệu định kỳ</p>
              <TimePicker onChange={onCronjobChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </div>
            <Modal
              title="Thêm website"
              open={isAdding}
              okText="Lưu"
              cancelText="Huỷ"
              onCancel={() => {
                resetAdding();
              }}
              modalRender={(dom) => (
                <Form
                  layout="vertical"
                  form={form}
                  name="add-website-modal"
                  initialValues={{ modifier: 'public' }}
                  clearOnDestroy
                >
                  {dom}
                </Form>
              )}
              onOk={() => {
                const newWebsite = {
                  id: dataSource.length + 1,
                  name: addingWebsite.name,
                  linkSelector: addingWebsite.linkSelector
                }
                setDataSource([...dataSource, newWebsite]);
                resetAdding();
              }}
            >
              <Form.Item
                name="websiteLink"
                label="Link website"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập link website',
                  },
                ]}
              >
                <Input
                  value={addingWebsite?.name}
                  onChange={(e) => {
                    setAddingWebsite((pre) => {
                      return { ...pre, name: e.target.value };
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="linkSelector"
                label="Link selector"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập link selector',
                  },
                ]}
              >
                <Input
                  value={addingLinkSelector?.linkSelector}
                  onChange={(e) => {
                    setAddingLinkSelector((pre) => {
                      return { ...pre, linkSelector: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Modal>
            <Modal
              title="Sửa website"
              open={isEditing}
              okText="Lưu"
              onCancel={() => {
                resetEditing();
              }}
              modalRender={(dom) => (
                <Form
                  layout="vertical"
                  form={form}
                  name="edit-website-form"
                  initialValues={{ modifier: 'public' }}
                  clearOnDestroy
                  onFinish={(values) => onCreate(values)}
                >
                  {dom}
                </Form>
              )}
              onOk={() => {
                setDataSource((pre) => {
                  return pre.map((website) => {
                    if (website.id === editingWebsite.id) {
                      return editingWebsite;
                    } else {
                      return website;
                    }
                  });
                });
                resetEditing();
              }}
            >
              {/* <Input
                value={addingWebsite?.name}
                onChange={(e) => {
                  setEditingWebsite((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
              <Input
                value={addingLinkSelector?.linkSelector}
                onChange={(e) => {
                  setEditingLinkSelector((pre) => {
                    return { ...pre, linkSelector: e.target.value };
                  });
                }}
              /> */}
              <Form.Item
                name="websiteLink"
                label="Link website"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập link website',
                  },
                ]}
              >
                <Input
                  value={editingWebsite?.name}
                  onChange={(e) => {
                    setEditingWebsite((pre) => {
                      return { ...pre, name: e.target.value };
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                name="linkSelector"
                label="Link selector"
                rules={[
                  {
                    required: true,
                    message: 'Hãy nhập link selector',
                  },
                ]}
              >
                <Input
                  value={editingWebsite?.linkSelector}
                  onChange={(e) => {
                    setEditingLinkSelector((pre) => {
                      return { ...pre, linkSelector: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Modal>
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

export default RealEstateWebsites;