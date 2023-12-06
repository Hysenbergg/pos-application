import React, { useState, useEffect } from "react";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import Header from "../components/header/Header";
import { Spin } from "antd";

function HomePage() {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  // Get Products
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

  // Get Categories
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/categories/all-categories"
      );
      const data = await response.json();
      data &&
        setCategories(
          data.map((item) => {
            return { ...item, value: item.title };
          })
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="px-6 flex flex-col md:flex-row justify-between gap-10 pb-24 md:pb-0 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 min-h-[150px]">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
              getCategories={getCategories}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
            <CartTotals />
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

export default HomePage;
