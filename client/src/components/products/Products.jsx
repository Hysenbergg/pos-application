import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";

function Products({ categories, filtered, products, setProducts, search }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem item={item} key={item._id} />
        ))}

      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none flex justify-center 
        items-center bg-purple-800 hover:opacity-90 min-h-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:font-2xl" />
      </div>
      <div
        className="product-item border hover:shadow-lg cursor-pointer transition-all select-none flex justify-center 
          items-center bg-orange-800 hover:opacity-90 min-h-[180px]"
        onClick={() => navigate("/products")}
      >
        <EditOutlined className="text-white md:font-2xl" />
      </div>

      <AddProduct
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default Products;
