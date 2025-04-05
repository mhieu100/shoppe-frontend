import React from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
const ModalDiscount = (props) => {
  const { isModalOpen, setIsModalOpen, onAddDiscount } = props;

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onAddDiscount(values); // Gửi dữ liệu lên component cha
      form.resetFields(); // Xóa dữ liệu trong form
      setIsModalOpen(false);
    });
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
        <Form
          form={form}
          layout="vertical"
          name="discountForm"
          initialValues={{ code: '', usage_limit: 1 }}
        >
          <Form.Item
            label="Discount Code"
            name="code"
            rules={[
              { required: true, message: 'Please enter the discount code!' },
              { min: 3, message: 'Code must be at least 3 characters!' },
            ]}
          >
            <Input placeholder="Enter discount code" />
          </Form.Item>

          <Form.Item
            label="Usage Limit"
            name="usage_limit"
            rules={[
              { required: true, message: 'Please enter the usage limit!' },
              { type: 'number', min: 1, message: 'Must be at least 1!' },
            ]}
          >
            <InputNumber
              min={1}
              max={1000}
              style={{ width: '100%' }}
              placeholder="Enter usage limit"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDiscount;
