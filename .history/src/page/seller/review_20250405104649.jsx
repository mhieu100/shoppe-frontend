import { ProTable } from '@ant-design/pro-components';
import { Rate } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/slice/reviewSlice';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { reviews, total, loading } = useSelector((state) => state.review);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Date',
      dataIndex: 'date_created',
      key: 'date_created',
    },
  ];

  const ref = useRef();

  const fetchData = async () => {
    const result = await dispatch(getReviews()).unwrap();
    return {
      data: result.data,
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
      />
    </>
  );
};

export default ReviewPage;
