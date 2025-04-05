import { ProTable } from '@ant-design/pro-components';
import { Tag, Space, Select, message } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, updateStatus } from '../../redux/slice/orderSlice';
import dayjs from 'dayjs';

const statusColors = {
  PENDING: 'orange',
  PROCESSING: 'blue',
  SHIPPED: 'purple',
  DELIVERED: 'green',
  CANCELLED: 'red',
};

const statuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];


const OrderPage = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const ref = useRef();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await dispatch(updateStatus({ orderId, status: newStatus })).unwrap();
      message.success('Status updated successfully');
      ref.current?.reload();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Total Amount',
      dataIndex: 'price',
      key: 'price',
      render: (amount) => `$${Number(amount).toFixed(2)}`,
    },
    {
      title: 'Shipping Address',
      dataIndex: 'shippingAddress',
      key: 'shippingAddress',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date) => {
        const formattedDate = date
          ? dayjs(date).format('DD/MM/YYYY HH:mm:ss')
          : '-';
        return formattedDate;
      },
      sorter: (a, b) => {
        if (!a.orderDate || !b.orderDate) return 0;
        return dayjs(a.orderDate).unix() - dayjs(b.orderDate).unix();
      },
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
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

  const fetchData = async () => {
    const result = await dispatch(getOrders()).unwrap();
    console.log('result', result);
    return {
      data: result,
      success: true,
      total: result.total,
    };
  };

  return (
    <ProTable
      actionRef={ref}
      request={fetchData}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
      search={false}
    />
  );
};

export default OrderPage;
