<<<<<<< HEAD
import { useState } from 'react';
import { CheckSquareOutlined } from '@ant-design/icons';
import { Col, Form, message, notification, Row } from 'antd';
import {
    FooterToolbar,
    ModalForm,
    ProFormDatePicker,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import '../../styles/reset.scss';
import { callCreateUser, callUpdateUser } from '../../service/api.user';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const ModalUser = (props) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

    const [form] = Form.useForm();
    const [animation, setAnimation] = useState('open');

    const submitUser = async (valuesForm) => {
        const { fullname, email, phoneNumber, birthday, address } = valuesForm;

        try {
            if (dataInit?.id) {
                // Update user
                const res = await callUpdateUser(
                    dataInit.id,
                    fullname,
                    email,
                    phoneNumber,
                    birthday,
                    address,
                );

                if (res.data) {
                    message.success('Cập nhật người dùng thành công');
                } else {
                    notification.error({
                        message: 'Có lỗi xảy ra',
                        description: res.message,
                    });
                }
            } else {
                // Create user
                const res = await callCreateUser(
                    fullname,
                    email,
                    phoneNumber,
                    birthday,
                    address,
                );

                if (res.data) {
                    message.success('Thêm mới người dùng thành công');
                } else {
                    notification.error({
                        message: 'Tạo người dùng thất bại',
                        description: res.error,
                    });
                }
            }

            handleReset();
            reloadTable();
        } catch (error) {
            notification.error({
                message: 'Có lỗi xảy ra',
                description: error.message || 'Lỗi không xác định',
            });
        }
    };

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        // Add animation when closing modal
        setAnimation('close');
        await new Promise((resolve) => setTimeout(resolve, 400));
        setOpenModal(false);
        setAnimation('open');
    };


    return (
        <>
            {openModal && (
                <ModalForm
                    title={dataInit?.id ? 'Cập nhật Người dùng' : 'Tạo mới Người dùng'}
                    open={openModal}
                    modalProps={{
                        onCancel: () => {
                            handleReset();
                        },
                        afterClose: () => handleReset(),
                        destroyOnClose: true,
                        footer: null,
                        keyboard: false,
                        maskClosable: false,
                        className: `modal-company ${animation}`,
                        rootClassName: `modal-company-root ${animation}`,
                    }}
                    scrollToFirstError
                    preserve={false}
                    form={form}
                    onFinish={submitUser}
                    initialValues={dataInit?.id ? dataInit : {}}
                    submitter={{
                        render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
                        submitButtonProps: {
                            icon: <CheckSquareOutlined />,
                        },
                        searchConfig: {
                            resetText: 'Hủy',
                            submitText: <>{dataInit?.id ? 'Cập nhật' : 'Tạo mới'}</>,
                        },
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <ProFormText
                                label='Tên người dùng'
                                name='fullname'
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder='Nhập tên người dùng...'
                            />
                        </Col>
                        <Col span={12}>
                            <ProFormText
                                label='Email'
                                name='email'
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder='Nhập email...'
                            />
                        </Col>
                        <Col span={12}>
                            <ProFormText
                                label='Số điện thoại'
                                name='phoneNumber'
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder='Nhập số điện thoại...'
                            />
                        </Col>
                        <Col span={12}>
                            <ProFormDatePicker
                                name='birthday'
                                label='Ngày sinh'
                                placeholder='Nhập ngày sinh...'
                                value={dataInit?.birthday ? dayjs(dataInit.birthday, dateFormat) : null}
                                width='100%'
                            />
                        </Col>
                        <Col span={12}>
                            <ProFormTextArea
                                label='Địa chỉ'
                                name='address'
                                rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                                placeholder='Nhập địa chỉ...'
                                fieldProps={{
                                    autoSize: { minRows: 4 },
                                }}
                            />
                        </Col>


                    </Row>
                </ModalForm>
            )}
        </>
    );
=======
import React from 'react';
import { Modal } from 'antd';
const ModalUser = (props) => {
  const { isModalOpen, setIsModalOpen } = props;

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
>>>>>>> 2a1951521fbb88e17cf7c43b9407b5186dded4f2
};

export default ModalUser;