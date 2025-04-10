import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  ProductOutlined,
  OrderedListOutlined,
  DiscordOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
const { Header, Sider, Content } = Layout;

const LayoutSeller = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');
  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

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
      label: <label onClick={null}>Đăng xuất</label>,
    },
  ];

  const menuSidebar = [
    {
      key: '/seller',
      icon: <AppstoreOutlined />,
      label: <Link to="/seller">Dashboard</Link>,
    },
    {
      key: '/seller/product',
      icon: <ProductOutlined />,
      label: <Link to="/seller/product">Product</Link>,
    },
    {
      key: '/seller/review',
      icon: <UploadOutlined />,
      label: <Link to="/seller/review">Review</Link>,
    },
    {
      key: '/seller/order',
      icon: <OrderedListOutlined />,
      label: <Link to="/seller/order">Order</Link>,
    },
    {
      key: '/seller/discount',
      icon: <DiscordOutlined />,
      label: <Link to="/seller/discount">Dsicount</Link>,
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
export default LayoutSeller;
