import React from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ModalProduct = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Data:', values);
        message.success('Product added successfully!');
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.error('Validation Failed:', info);
      });
  };
  return (
    <>
      <Modal
        title="Add New Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter product name!' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter product description!' },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              { required: true, message: 'Please upload product image!' },
            ]}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter product price!' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="Enter product price"
            />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stockQuantity"
            rules={[
              { required: true, message: 'Please enter stock quantity!' },
            ]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="Enter stock quantity"
            />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select placeholder="Select category">
              <Select.Option value="Electronics">Electronics</Select.Option>
              <Select.Option value="Accessories">Accessories</Select.Option>
              <Select.Option value="Audio">Audio</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalProduct;
