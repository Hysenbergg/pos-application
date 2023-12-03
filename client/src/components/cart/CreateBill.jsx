import React from "react";
import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function CreateBill({ isModalOpen, setIsModalOpen }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          cartItems: cart.cartItems,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100)
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if(res.status === 200){
        message.success("Fatura başarılı bir şekilde oluşturuldu.");
        dispatch(reset());
        navigate('/bills');
      }
    } catch (error) {
      message.danger("Fatura oluşturma işleminde bir hata oluştu!");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      footer={false}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <div>
        <Form layout={"vertical"} onFinish={onFinish} className="mt-4">
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[
              {
                required: true,
                message: "Müşteri adı alanı zorunludur.",
              },
            ]}
          >
            <Input placeholder="Müşteri Adını Giriniz.." />
          </Form.Item>
          <Form.Item
            label="Telefon Numarası"
            name={"customerPhoneNumber"}
            rules={[
              {
                required: true,
                message: "Telefon numarası alanı zorunludur.",
              },
            ]}
          >
            <Input placeholder="Müşterin Telefon Numarasını Giriniz.." />
          </Form.Item>
          <Form.Item
            label="Ödeme Yöntemi"
            rules={[{ required: true }]}
            name={"paymentMode"}
          >
            <Select placeholder="Bir Ödeme Yöntemi Seçiniz..">
              <Select.Option value="nakit">Nakit</Select.Option>
              <Select.Option value="krediKarti">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>
          <Card>
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{cart.tax}</span>
              <span className="text-red-600">
                {(cart.total * cart.tax) / 100 > 0
                  ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {cart.total + (cart.total * cart.tax) / 100 > 0
                  ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <div className="flex justify-end">
              <Button
                className="mt-4"
                type="primary"
                htmlType="submit"
                disabled={cart.cartItems.length === 0}
              >
                Sipariş Oluştur
              </Button>
            </div>
          </Card>
        </Form>
      </div>
    </Modal>
  );
}

export default CreateBill;
