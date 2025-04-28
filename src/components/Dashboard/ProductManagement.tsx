import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm } from 'antd';
import axios from 'axios';
import Products from '../Products/Products';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [form] = Form.useForm();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEdit = async (values: any) => {
    try {
      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct._id}`, values);
      } else {
        await axios.post('/api/products', values);
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => (
        <>
          <Button
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
            <Button danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="h-full w-full" style={{ padding: 24, background: '#fff' }}>
      {/* <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setEditingProduct(null);
          setIsModalVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>

      <Table dataSource={products} columns={columns} rowKey="_id" loading={loading} />

      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
          <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal> */}
      <Products></Products>
    </div>
  );
};

export default ProductManagement;
