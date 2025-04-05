import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

const ModalDiscount = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  initialValues,
  title = 'Add Discount',
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
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
  );
};

export default ModalDiscount;
