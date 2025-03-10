import { ProTable } from '@ant-design/pro-components';
import { Button, Image, Carousel, Space, Popconfirm, App } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalProduct from '../../components/modal/modal.product';
import { deleteProduct, fetchProducts } from '../../redux/slice/productSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state?.product);
  const ref = useRef();
  const { message: messageApi } = App.useApp();
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Initial data fetch
  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  // Update local state when Redux data changes
  useEffect(() => {
    if (products?.result) {
      setTableData(products.result);
    }
  }, [products]);

  const fetchData = async (params) => {
    await dispatch(fetchProducts(params));
    return {
      data: products?.result || [],
      success: true,
      total: products?.result?.length || 0,
    };
  };

  const handleEdit = (record) => {
    setEditProduct(record);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditProduct(null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!id) return;

    setDeleteLoading((prev) => ({ ...prev, [id]: true }));

    try {
      await dispatch(deleteProduct(id)).unwrap();

      messageApi.success('Delete product successfully');
      fetchData({});
    } catch (err) {
      messageApi.error('Failed to delete product');
    }
  };
  const renderImages = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return (
        <Image
          width={80}
          src="https://via.placeholder.com/150"
          alt="No Image Available"
        />
      );
    }

    return (
      <Carousel autoplay style={{ width: 80 }}>
        {images.map((img) => (
          <Image
            key={img?.id || img?.url || Math.random()}
            width={50}
            src={img?.url}
            alt="Product Image"
          />
        ))}
      </Carousel>
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'descriptions',
      key: 'descriptions',
      ellipsis: true,
    },
    {
      title: 'Images',
      dataIndex: 'images',
      key: 'images',
      render: renderImages,
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
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Action',
      hiddenInSearch: true,
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>

          <Popconfirm
            placement="leftTop"
            title="Xác nhận xóa user"
            description={`Bạn có chắc chắn muốn xóa ${record.name}?`}
            onConfirm={() => handleDelete(record?.id)}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{
              danger: true,
              loading: deleteLoading[record.id],
            }}
          >
            <span style={{ cursor: 'pointer', margin: '0 10px' }}>
              <Button>Delete</Button>
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        actionRef={ref}
        request={fetchData}
        dataSource={tableData}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => handleAdd()}>
            Add Product
          </Button>,
        ]}
      />
      <ModalProduct
        isModalOpen={open}
        setIsModalOpen={setOpen}
        onSuccess={() => fetchData({})}
        editProduct={editProduct}
      />
    </>
  );
};

export default ProductPage;
