import { ProTable } from '@ant-design/pro-components';
import { Rate } from 'antd';
import React, { useRef } from 'react';

const ReviewPage = () => {
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
    const data = [
      {
        username: 'John Doe',
        product_name: 'Wireless Mouse',
        comment: 'Great product! Works smoothly.',
        rating: 5,
        date_created: '2025-03-02',
      },
      {
        username: 'Jane Smith',
        product_name: 'Mechanical Keyboard',
        comment: 'Good quality, but a bit noisy.',
        rating: 4,
        date_created: '2025-03-01',
      },
      {
        username: 'Alice Johnson',
        product_name: 'Gaming Monitor',
        comment: 'Excellent resolution and refresh rate.',
        rating: 5,
        date_created: '2025-02-28',
      },
      {
        username: 'Bob Brown',
        product_name: 'USB-C Hub',
        comment: 'Very useful for my MacBook.',
        rating: 4,
        date_created: '2025-02-27',
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
      />
    </>
  );
};

export default ReviewPage;
