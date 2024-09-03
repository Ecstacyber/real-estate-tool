import React, { useState, useRef, useEffect } from "react";
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

const SiteDetails = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
    const searchInput = useRef(null);

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

    // const [dataSource, setDataSource] = useState([
    //     {
    //         id: 1,
    //         title: 'GIÁ SIÊU TỐT ĐƯỜNG MỸ ĐÌNH - 3.5 TỶ 31.3m2 - NHÀ XÂY MỚI - LÔ GÓC',
    //         price: '3 500 000 000',
    //         area: '32 m2',
    //         legal: 'Sổ đỏ/Sổ hồng',
    //         province: 'Hà Nội',
    //         district: 'Nam Từ Liêm',
    //         type: 'Nhà'
    //     },
    //     {
    //         id: 2,
    //         title: 'Bán Nhà Hoà Hảo Quận 10 Phường 4.',
    //         price: '8 700 000 000',
    //         area: '42 m2',
    //         legal: 'Sổ đỏ/Sổ hồng',
    //         province: 'Hồ Chí Minh',
    //         district: 'Quận 10',
    //         type: 'Nhà'
    //     }
    // ]);

    const [dataSource, setDataSource] = useState();

    const fetchData = () => {
    setLoading(true);
    fetch(``)
      .then((res) => res.json())
      .then(({ results }) => {
        setDataSource(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: results.length,
          },
        });
      });
    };
    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
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
            dataIndex: "id"
        },
        {
            key: "title",
            title: "Tên",
            dataIndex: "title",
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.title > b.title,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('title')
        },
        {
            key: 'price',
            title: 'Giá',
            dataIndex: 'price',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.price > b.price,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('price')
        },
        {
            key: 'area',
            title: 'Diện tích',
            dataIndex: 'area',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.area > b.area,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('area')
        },
        {
            key: 'legal',
            title: 'Pháp lý',
            dataIndex: 'legal',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.legal > b.legal,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('legal')
        },
        {
            key: 'province',
            title: 'Tỉnh/Thành',
            dataIndex: 'province',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.province > b.province,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('province')
        },
        {
            key: 'district',
            title: 'Quận/Huyện',
            dataIndex: 'district',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.district > b.district,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('district')
        },
        {
            key: 'type',
            title: 'Loại',
            dataIndex: 'type',
            showSorterTooltip: {
                target: 'full-header',
            },
            sorter: (a, b) => a.type > b.type,
            sortDirections: ['descend', 'ascend'],
            ...getColumnSearchProps('type')
        },
    ];

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
                            title={() => 'Danh sách các bất động sản'}
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
    )
}

export default SiteDetails;