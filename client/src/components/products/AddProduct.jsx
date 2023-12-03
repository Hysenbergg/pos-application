import React from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";

const AddProduct = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      form.resetFields();
      setProducts([
        ...products,
        {
            ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      message.error("Bir şeyler yanlış oldu!");
      console.log(error);
    }
  };

  return (
    <Modal
      open={isAddModalOpen}
      title="Yeni Ürün Ekle"
      footer={false}
      onCancel={() => setIsAddModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label={"Ürün Adı Ekle"}
          rules={[
            {
              required: true,
              message: "Ürün Adı Alanı Boş Geçilemez!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="img"
          label={"Resim Ekle"}
          rules={[
            {
              required: true,
              message: "Resim Alanı Boş Geçilemez!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label={"Fiyat Ekle"}
          rules={[
            {
              required: true,
              message: "Fiyat Alanı Boş Geçilemez!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label={"Kategori Seç"}
          rules={[
            {
              required: true,
              message: "Kategori Alanı Boş Geçilemez!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
