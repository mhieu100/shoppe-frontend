import { Badge, Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { sfLike } from 'spring-filter-query-builder';
import queryString from 'query-string';

import DataTable from '../../components/data-table';
import { fetchUser } from '../../redux/slice/userSlice';
import ModalUser from '../../components/modal/modal.user';
import { callDeleteUser } from '../../service/api.user';

const UserPage = () => {
  const tableRef = useRef();
  const reloadTable = () => {
    tableRef?.current?.reload();
  };

  const [dataInit, setDataInit] = useState(null);

  const isFetching = useSelector((state) => state.user.isFetching);
  const meta = useSelector((state) => state.user.meta);
  const users = useSelector((state) => state.user.result);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const handleDeleteUser = async (id) => {
    if (id) {
      await callDeleteUser(id);

      message.success('Xóa user thành công');
      reloadTable();

    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 50,
      align: 'center',
      hideInSearch: true,
      render: (text, record, index) => {
        return <>{index + 1 + (meta.page - 1) * meta.pageSize}</>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },

    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      hideInSearch: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      hideInSearch: true,

    },
    {
      title: 'Role',
      dataIndex: 'roles',
      hideInSearch: true,
      render: (_value, entity) => {
        // Ensure roles is an array
        const roles = Array.isArray(entity.roles) ? entity.roles : [entity.roles];

        return (
          <div>
            {roles.map((role, index) => {
              let color;
              switch (role) {
                case 'ADMIN':
                  color = '#faad14'; // Orange
                  break;
                case 'CUSTOMER':
                  color = '#52c41a'; // Green
                  break;
                case 'SELLER':
                  color = '#1890ff'; // Blue
                  break;
                default:
                  color = '#d9d9d9'; // Gray (default)
              }

              return (
                <Badge
                  key={index} // Unique key for each badge
                  count={role}
                  showZero
                  color={color}
                  style={{ marginRight: 8 }} // Add spacing between badges
                />
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      hideInSearch: true,
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
            title='Xác nhận xóa user'
            description='Bạn có chắc chắn muốn xóa user này ?'
            onConfirm={() => handleDeleteUser(entity.id)}
            okText='Xác nhận'
            cancelText='Hủy'
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

  return (
    <>
      <DataTable
        actionRef={tableRef}
        headerTitle='Danh sách User'
        rowKey='id'
        loading={isFetching}
        columns={columns}
        dataSource={users}
        request={async (params, sort, filter) => {
          const query = buildQuery(params, sort, filter);
          dispatch(fetchUser({ query }));
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
                {range[0]}-{range[1]} trên {total} rows
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
              Thêm mới
            </Button>
          );
        }}
      />
      <ModalUser
        openModal={openModal}
        setOpenModal={setOpenModal}
        reloadTable={reloadTable}
        dataInit={dataInit}
        setDataInit={setDataInit}
      />
    </>
  );
};

export default UserPage;