import { ProTable } from '@ant-design/pro-components';
import { Space, Button, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import ModalDiscount from '../../components/modal/modal.discount';

const DiscountPage = () => {
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Usage Limit',
      dataIndex: 'usage_limit',
      key: 'usage_limit',
    },
    {
      title: 'Used',
      dataIndex: 'used',
      key: 'used',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button>Edit</Button>
          <Popconfirm
            placement="leftTop"
            title="Xác nhận xóa sản phẩm"
            okText="Xác nhận"
            cancelText="Hủy"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef();
  const fetchData = async () => {
    const data = [
      {
        id: 1,
        code: 'DISC2024',
        usage_limit: 100,
        used: 45,
      },
      {
        id: 2,
        code: 'SALE50',
        usage_limit: 50,
        used: 10,
      },
      {
        id: 3,
        code: 'FREESHIP',
        usage_limit: 200,
        used: 150,
      },
    ];

    return {
      data,
      success: true,
      total: data.length,
    };
  };

  return (
    <>
      <ProTable
        actionRef={ref}
        request={fetchData}
        columns={columns}
        rowKey="id"
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setIsModalOpen(true)}>
            Add Discount
          </Button>,
        ]}
      />
      ;
      <ModalDiscount
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default DiscountPage;
