
import { useState } from 'react';
import {
  FooterToolbar,
  ModalForm,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Col,
  Form,
  message,
  notification,
  Row,
} from 'antd';
import {
  CheckSquareOutlined,

} from '@ant-design/icons';

import '../../styles/reset.scss';
import { callCreateCategory, callUpdateCategory } from '../../service/api.category';

const ModalCategory = (props) => {
  const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;
  const [animation, setAnimation] = useState('open');
  const [form] = Form.useForm();

  const handleReset = async () => {
    form.resetFields();
    setDataInit(null);

    setAnimation('close');
    await new Promise((r) => setTimeout(r, 400));
    setOpenModal(false);
    setAnimation('open');
  };

  const submitCategory = async (valuesForm) => {
    const { name, description } = valuesForm;


    if (dataInit?.id) {
      const res = await callUpdateCategory(
        dataInit.id,
        name,
        description
      );
      if (res.data) {
        message.success('Category updated successfully');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    } else {
      const res = await callCreateCategory(
        name,
        description
      );
      if (res.data) {
        message.success('Category created successfully');
        handleReset();
        reloadTable();
      } else {
        notification.error({
          message: 'An error occurred',
          description: res.message,
        });
      }
    }
  };

  return (
    <>
      {openModal && (
        <>
          <ModalForm
            title={
              <>
                {dataInit?.id ? 'Update Category' : 'Create New Category'}
              </>
            }
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
            scrollToFirstError={true}
            preserve={false}
            form={form}
            onFinish={submitCategory}
            initialValues={dataInit?.id ? dataInit : {}}
            submitter={{
              render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
              submitButtonProps: {
                icon: <CheckSquareOutlined />,
              },
              searchConfig: {
                resetText: 'Cancel',
                submitText: <>{dataInit?.id ? 'Update' : 'Create'}</>,
              },
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  label='Name'
                  name='name'
                  rules={[{ required: true, message: 'Please do not leave blank' }]}
                  placeholder='Enter  name...'
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  label='Description'
                  name='description'
                  rules={[{ required: true, message: 'Please do not leave blank' }]}
                  placeholder='Enter description...'
                />
              </Col>

            </Row>
          </ModalForm>

        </>
      )}
    </>
  );
};

export default ModalCategory;