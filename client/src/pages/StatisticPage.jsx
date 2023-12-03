import React, { useEffect, useState } from "react";
import StatisticCard from "../components/statistics/StatisticCard";
import Header from "../components/header/Header";
import { Spin } from "antd";

function StatisticPage() {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/all-products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/all-bills")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistikler</h1>
      {data ? (
        <div className="flex flex-col px-6 md:pb-0 pb-20">
          <div className="statistic-section">
            <h2 className="text-lg">
              Hoş geldin{" "}
              <span className="text-green-700 text-xl font-bold">
                {user.username}
              </span>
              .
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4 my-5">
              <StatisticCard
                title={"Toplam Müşteri"}
                amount={data?.length}
                image={"images/user.png"}
              />
              <StatisticCard
                title={"Toplam Kazanç"}
                amount={totalAmount()}
                image={"images/money.png"}
              />
              <StatisticCard
                title={"Toplam Satış"}
                amount={data?.length}
                image={"images/sale.png"}
              />
              <StatisticCard
                title={"Toplam Ürün"}
                amount={products.length}
                image={"images/product.png"}
              />
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
}

export default StatisticPage;

/*
const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nTutar",
      },
    },
  };
 <div className="flex justify-between gap-10 lg:flex-row flex-col items-center mb-10">
              <div className="lg:w-1/2 w-full lg:h-full h-72">
                <Area {...config} />
              </div>
              <div className="lg:w-1/2 w-full lg:h-full h-72">
                <Pie {...config2} />
              </div>
            </div>
*/