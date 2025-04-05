import { ProTable } from '@ant-design/pro-components';
import { Space, Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalDiscount from '../../components/modal/modal.discount';
import {
  getDiscounts,
  addDiscount,
  editDiscount,
  removeDiscount,
} from '../../redux/slice/discountSlice';

const DiscountPage = () => {
  const dispatch = useDispatch();
  const { discounts, loading } = useSelector((state) => state.discount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const ref = useRef();

  const handleAddDiscount = async (values) => {
    try {
      await dispatch(addDiscount(values)).unwrap();
      message.success('Discount added successfully');
      ref.current?.reload();
    } catch (error) {
      message.error('Failed to add discount');
    }
  };

  const handleEditDiscount = async (values) => {
    try {
      await dispatch(
        editDiscount({ id: editingDiscount.id, data: values })
      ).unwrap();
      message.success('Discount updated successfully');
      setEditingDiscount(null);
      ref.current?.reload();
    } catch (error) {
      message.error('Failed to update discount');
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(removeDiscount(id)).unwrap();
      message.success('Discount deleted successfully');
      ref.current?.reload();
    } catch (error) {
      message.error('Failed to delete discount');
    }
  };

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
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setEditingDiscount(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="leftTop"
            title="Delete Confirmation"
            description="Are you sure to delete this discount?"
            onConfirm={() => handleDelete(record.id)}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    const result = await dispatch(getDiscounts());
    console.log(result);
    return {
      data: result,
      success: true,
      total: result.total,
    };
  };

  return (
    <>
      <ProTable
        actionRef={ref}
        request={fetchData}
        columns={columns}
        rowKey="id"
        loading={loading}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={() => setIsModalOpen(true)}>
            Add Discount
          </Button>,
        ]}
      />
      <ModalDiscount
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={editingDiscount ? handleEditDiscount : handleAddDiscount}
        initialValues={editingDiscount}
        title={editingDiscount ? 'Edit Discount' : 'Add Discount'}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingDiscount(null);
        }}
      />
    </>
  );
};

export default DiscountPage;
