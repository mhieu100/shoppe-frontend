import { ProTable } from '@ant-design/pro-components';
import { Tag, Space, Select, List } from 'antd';
import React, { useRef, useState } from 'react';
import ModalProduct from '../../components/modal/modal.product';

const statusColors = {
  pending: 'orange',
  processing: 'blue',
  shipped: 'purple',
  delivered: 'green',
  cancel: 'red',
};

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancel'];

const OrderPage = () => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    ref.current?.reload(); // Reload lại bảng sau khi cập nhật
  };

  const fetchData = async () => {
    const data = [
      {
        id: 1,
        username: 'JohnDoe',
        products_name: [
          { name: 'Wireless Mouse', price: 25.99 },
          { name: 'Phone Case', price: 12.99 },
        ],
        total_amount: 38.98,
        shipping_address: '123 Main St, New York',
        order_date: '2025-03-02',
        status: 'pending',
      },
      {
        id: 2,
        username: 'JaneSmith',
        products_name: [{ name: 'Mechanical Keyboard', price: 89.99 }],
        total_amount: 89.99,
        shipping_address: '456 Elm St, Los Angeles',
        order_date: '2025-03-01',
        status: 'processing',
      },
    ];
    return { data, success: true, total: data.length };
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Products Name',
      dataIndex: 'products_name',
      key: 'products_name',
      render: (products) => (
        <List
          size="small"
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              {product.name} - ${product.price}
            </List.Item>
          )}
        />
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space>
          <Tag color={statusColors[record.status]}>{record.status}</Tag>
          <Select
            value={record.status}
            onChange={(value) => handleStatusChange(record.id, value)}
            options={statuses.map((status) => ({
              label: status,
              value: status,
            }))}
            style={{ width: 120 }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        actionRef={ref}
        request={async () => {
          const res = await fetchData();
          setData(res.data); // Cập nhật data khi fetch
          return res;
        }}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        search={false}
      />
      <ModalProduct isModalOpen={open} setIsModalOpen={setOpen} />
    </>
  );
};

export default OrderPage;
