import React from "react";
import { Button, Form, Input, Modal, message } from "antd";

const AddCategory = ({ isAddModalOpen, setIsAddModalOpen, categories, setCategories, getCategories}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori başarıyla eklendi.");
      form.resetFields();
      setCategories([...categories, {
        _id: Math.random(),
        title: values.title
      }]);
      setIsAddModalOpen(false);
      getCategories();
    } catch (error) {
      message.error("Bir şeyler yanlış oldu!");
      console.log(error);
    }
  };

  return (
    <Modal
      open={isAddModalOpen}
      title="Yeni Kategori Ekle"
      footer={false}
      onCancel={() => setIsAddModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label={"Kategori Ekle"}
          rules={[
            {
              required: true,
              message: "Kategori Alanı Boş Geçilemez!",
            },
          ]}
        >
          <Input />
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

export default AddCategory;
