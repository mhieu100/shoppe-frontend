import { ProTable } from '@ant-design/pro-components';
import { Rate } from 'antd';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/slice/reviewSlice';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.review);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
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
      dataIndex: 'reviewDate',
      key: 'reviewDate',
    },
  ];

  const ref = useRef();

  const fetchData = async () => {
    const result = await dispatch(getReviews()).unwrap();
    return {
      data: reviews,
      success: true,
      total: reviews.length,
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
        dataSource={reviews}
      />
    </>
  );
};

export default ReviewPage;
