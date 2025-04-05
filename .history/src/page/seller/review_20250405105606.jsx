import { ProTable } from '@ant-design/pro-components';
import { Rate } from 'antd';
import React, { useRef,use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/slice/reviewSlice';


const ReviewPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review);

  useEffect(() => {
    fetchData();
  }, []);

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
  console.log('reviews', reviews);
  const fetchData = async () => {
    await dispatch(getReviews()).unwrap();
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
