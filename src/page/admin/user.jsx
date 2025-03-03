import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { Space } from 'antd/lib';
import React, { useRef, useState } from 'react'
import ModalUser from '../../components/modal/modal.user';
import { PlusOutlined } from '@ant-design/icons';

const UserPage = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      hiddenInSearch: true,
      render: () => (
        <Space>
          <Button onClick={() => setIsModalOpen(true)}>Edit</Button>
          <Popconfirm
            placement='leftTop'
            title='Xác nhận xóa user'
            description='Bạn có chắc chắn muốn xóa user này ?'
            okText='Xác nhận'
            cancelText='Hủy'
          >
            <span style={{ cursor: 'pointer', margin: '0 10px' }}>
              <Button >Delete</Button>
            </span>
          </Popconfirm>
        </Space>
      ),
    }
  ];

  const ref = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ProTable actionRef={ref}ư
        request={async () => {
          // Simulate an API call (replace with your actual API)
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const data = await response.json();

          // Return data in the format ProTable expects
          return {
            data: data.map(user => ({
              id: user.id,
              name: user.name,
              age: Math.floor(Math.random() * 50) + 20, // Random age for demo
              address: user.address.street,
            })),
            success: true,
            total: data.length, // Total number of records for pagination
          };
        }}
        columns={columns}
        rowKey="id"
        toolBarRender={() => {
          return (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => setIsModalOpen(true)}
            >
              Thêm mới
            </Button>
          );
        }}
      />;
      <ModalUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  )
}

export default UserPage