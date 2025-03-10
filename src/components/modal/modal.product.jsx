import React, { useEffect } from 'react';
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  App,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slice/productSlice';
import { useState } from 'react';

const ModalProduct = ({
  isModalOpen,
  setIsModalOpen,
  onSuccess,
  editProduct,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { message: messageApi } = App.useApp();

  useEffect(() => {
    if (editProduct) {
      form.setFieldsValue({
        name: editProduct.name,
        description: editProduct.descriptions,
        price: editProduct.price,
        stockQuantity: editProduct.stockQuantity,
        category: editProduct.categoryId?.toString(),
        image: editProduct.images?.map((img) => ({
          uid: img.uid,
          name: img.name,
          status: 'done',
          url: img.url,
        })),
      });
    } else {
      form.resetFields();
    }
  }, [editProduct, form]);

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        try {
          const product = {
            name: values.name,
            description: values.description,
            images: values.image?.map((img) => img.originFileObj) || [],
            price: values.price,
            stockQuantity: values.stockQuantity,
            category: parseInt(values.category),
          };

          let response;
          if (editProduct?.id) {
            // For update, include the product id
            product.id = editProduct.id;
            response = await dispatch(updateProduct(product)).unwrap();
            // Check response for update success
            if (response) {
              messageApi.success('Product updated successfully!');
              form.resetFields();
              setIsModalOpen(false);
              onSuccess();
            } else {
              messageApi.error('Failed to update product.');
            }
          } else {
            // For add new product
            response = await dispatch(addProduct(product)).unwrap();
            // Check response for add success
            if (response) {
              messageApi.success('Product added successfully!');
              form.resetFields();
              setIsModalOpen(false);
              onSuccess();
            } else {
              messageApi.error('Failed to add product.');
            }
          }
        } catch (e) {
          console.error(e);
          messageApi.error('Something went wrong!');
        } finally {
          setLoading(false);
        }
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
        confirmLoading={loading}
        onCancel={handleCancel}
        okText="Add Product"
        cancelText="Cancel"
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
            <Upload beforeUpload={() => false} listType="picture" maxCount={4}>
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
              <Select.Option value="1">Electronics</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalProduct;
