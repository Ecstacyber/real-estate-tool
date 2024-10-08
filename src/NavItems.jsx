import {
    DashboardOutlined,
    DatabaseOutlined,
    FileOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const navItems = [
    {
        key: '1',
        icon: <DashboardOutlined />,
        label: <Link to="/">Trang chủ</Link>,
    },
    {
        key: '2',
        icon: <DatabaseOutlined />,
        label: <Link to="/real-estate-websites">Các website BĐS</Link>,
    },
    {
        key: '3',
        icon: <FileOutlined />,
        label: <Link to="/logs">Logs</Link>,
    }
];

export default navItems;