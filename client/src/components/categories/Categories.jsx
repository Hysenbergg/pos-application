import React, { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import "./style.css";
import AddCategory from "./AddCategory";
import EditCategories from "./EditCategories";

function Categories({ categories, setCategories, setFiltered, products }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      {categories.map((item) => (
        <li
          className={`category-item ${
            item.title === categoryTitle && "!bg-pink-700"
          }`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span>{item.title}</span>
        </li>
      ))}
      <li
        onClick={() => setIsAddModalOpen(true)}
        className="category-item !bg-purple-800 hover:opacity-90"
      >
        <PlusOutlined />
      </li>
      <li
        onClick={() => setIsEditModalOpen(true)}
        className="category-item !bg-orange-800 hover:opacity-90"
      >
        <EditOutlined />
      </li>
      <AddCategory
        categories={categories}
        setCategories={setCategories}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      <EditCategories
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
}

export default Categories;
