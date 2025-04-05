import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, message, Space, theme } from 'antd';
import { callLogout } from '../../service/api.auth';
import { setLogoutAction } from '../../redux/slice/accountSlide';
import { useDispatch } from 'react-redux';
const { Header, Sider, Content } = Layout;

const LayoutAdmin = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    await callLogout();
    dispatch(setLogoutAction({}));
    message.success('Đăng xuất thành công');
    navigate('/');
  };

  const items = [
    {
      key: 'home',
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 'profile',
      label: <Link to="/profile">Trang cá nhân</Link>,
    },
    {
      key: 'logout',
      danger: true,
      label: <label onClick={handleLogout}>Đăng xuất</label>,
    },
  ];

  const menuSidebar = [
    {
      key: '/admin',
      icon: <AppstoreOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">User</Link>,
    },
    {
      key: '/admin/categories',
      icon: <UploadOutlined />,
      label: <Link to="/admin/categories">Category</Link>,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          onClick={(e) => setActiveMenu(e.key)}
          items={menuSidebar}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: 20,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
