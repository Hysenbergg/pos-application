import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );
        message.success("Kayıt olma işlemi başarılı.");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı!");
      } else if (res.status === 403) {
        message.error("Şifre yanlış!");
      }

      setLoading(false);
    } catch (error) {
      message.error("Kayıt işleminde bir hata oluştu.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="px-10 w-full flex flex-col h-full relative justify-center">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form
            layout={"vertical"}
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label={"E-mail"}
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanını Boş Geçemezsiniz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"Şifre"}
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanını Boş Geçemezsiniz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox>Remember Me</Checkbox>
                <Link>Forgot Password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-3"
                size="large"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute bottom-10 left-0 w-full">
            Henüz hesabınız yok mu?&nbsp;{" "}
            <Link to="/register" className="text-blue-600">
              Şimdi Kayıt Ol.
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden h-full bg-[#6c63ff]">
          <div className="h-full w-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  title={"Responsive"}
                  description={"Tüm Cihaz Boyutlarıyla Uyumluluk"}
                  image={"/images/responsive.svg"}
                />
                <AuthCarousel
                  title={"İstatistikler"}
                  description={"Geniş Tutulan İstatistikler"}
                  image={"/images/statistic.svg"}
                />
                <AuthCarousel
                  title={"Müşteri Memnuniyeti"}
                  description={"Deneyim Sonunda Üründen Memnun Müşteriler"}
                  image={"/images/customer.svg"}
                />
                <AuthCarousel
                  title={"Yönetici Paneli"}
                  description={"Tek Yerden Yönetim"}
                  image={"/images/admin.svg"}
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
