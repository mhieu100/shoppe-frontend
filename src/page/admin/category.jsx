import React, { useRef, useState } from 'react'
import { callDeleteCategory } from '../../service/api.category';
import { Button, message, notification, Popconfirm, Space } from 'antd';
import { fetchCategory } from '../../redux/slice/categorySlice';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from '../../components/data-table';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { sfLike } from 'spring-filter-query-builder';
import queryString from 'query-string';
import ModalCategory from '../../components/modal/modal.category';

const CategoryPage = () => {
  const tableRef = useRef();

  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.category.isFetching);
  const meta = useSelector((state) => state.category.meta);
  const categories = useSelector((state) => state.category.result);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = async (id) => {
    if (id) {
      const res = await callDeleteCategory(id);
      if (res.status === 200) {
        message.success('Category deleted successfully');
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    }
  };

  const buildQuery = (params, sort) => {
    const clone = { ...params };
    const q = {
      page: params.current,
      size: params.pageSize,
      filter: '',
    };

    if (clone.name) q.filter = `${sfLike('name', clone.name)}`;
    if (clone.address) {
      q.filter = clone.name
        ? q.filter + ' and ' + `${sfLike('address', clone.address)}`
        : `${sfLike('address', clone.address)}`;
    }

    if (!q.filter) delete q.filter;

    let temp = queryString.stringify(q);

    let sortBy = '';
    if (sort && sort.name) {
      sortBy = sort.name === 'ascend' ? 'sort=name,asc' : 'sort=name,desc';
    }
    if (sort && sort.address) {
      sortBy =
        sort.address === 'ascend' ? 'sort=address,asc' : 'sort=address,desc';
    }
    if (sort && sort.capacity) {
      sortBy =
        sort.capacity === 'ascend' ? 'sort=capacity,asc' : 'sort=capacity,desc';
    }
    temp = `${temp}&${sortBy}`;

    return temp;
  };


  const columns = [
    {
      title: 'No.',
      key: 'index',
      width: 50,
      align: 'center',
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
      hideInSearch: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      sorter: true,
    },
    {
      title: 'Actions',
      hideInSearch: true,
      width: 50,
      render: (_value, entity) => (
        <Space>
          <EditOutlined
            style={{
              fontSize: 20,
              color: '#ffa500',
            }}
            onClick={() => {
              setOpenModal(true);
              setDataInit(entity);
            }}
          />

          <Popconfirm
            placement='leftTop'
            title='Confirm delete center'
            description='Are you sure you want to delete this center?'
            onConfirm={() => handleDelete(entity.id)}
            okText='Confirm'
            cancelText='Cancel'
          >
            <span style={{ cursor: 'pointer', margin: '0 10px' }}>
              <DeleteOutlined
                style={{
                  fontSize: 20,
                  color: '#ff4d4f',
                }}
              />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle='Vaccination Center List'
        rowKey='centerId'
        loading={isFetching}
        columns={columns}
        dataSource={categories}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          dispatch(fetchCategory({ query }));
        }}
        scroll={{ x: true }}
        pagination={{
          current: meta.page,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} of {total} rows
              </div>
            );
          },
        }}
        rowSelection={false}
        toolBarRender={() => {
          return (
            <Button
              icon={<PlusOutlined />}
              type='primary'
              onClick={() => setOpenModal(true)}
            >
              Add new
            </Button>
          );
        }}
      />
      <ModalCategory
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};

export default CategoryPage