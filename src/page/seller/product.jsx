import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import { Image } from 'antd';
import { Space } from 'antd/lib';
import React, { useRef, useState } from 'react';
import ModalProduct from '../../components/modal/modal.product';


const ProductPage = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image width={50} src={image} alt="Product Image" />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock Quantity',
      dataIndex: 'stockQuantity',
      key: 'stockQuantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button onClick={() => setOpen(true)}>Edit</Button>
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

  const ref = useRef();
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const data = [
      {
        id: 1,
        name: 'Wireless Mouse',
        description: 'A sleek and responsive wireless mouse.',
        image: 'https://via.placeholder.com/150',
        price: 25.99,
        stockQuantity: 120,
        category: 'Electronics',
      },
      {
        id: 2,
        name: 'Mechanical Keyboard',
        description: 'A durable mechanical keyboard with RGB lighting.',
        image: 'https://via.placeholder.com/150',
        price: 89.99,
        stockQuantity: 75,
        category: 'Accessories',
      },
      {
        id: 3,
        name: 'Gaming Headset',
        description: 'Noise-cancelling gaming headset with surround sound.',
        image: 'https://via.placeholder.com/150',
        price: 59.99,
        stockQuantity: 50,
        category: 'Audio',
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
          <Button key="add" type="primary" onClick={() => setOpen(true)}>
            Add Product
          </Button>,
        ]}
      />
      <ModalProduct isModalOpen={open} setIsModalOpen={setOpen} />
    </>
  );
};

export default ProductPage;
