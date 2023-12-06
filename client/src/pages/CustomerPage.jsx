import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Spin, Table } from "antd";
import Header from "../components/header/Header";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import StatisticCard from "../components/statistics/StatisticCard";

function CustomerPage() {
  const [bills, setBills] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/bills/all-bills"
        );
        const data = await res.json();
        setBills(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBills();
  }, []);

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

  const totalAmount = () => {
    const amount = bills.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  // Bu ve altındaki fonksiyonlar table içerisinde filtreleme işlemlerinde kullanılıyor.
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      key: "customerName",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
      ...getColumnSearchProps("customerPhoneNumber"),
    },
    {
      title: "Oluşturma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Müşteriler ve İstatistikler</h1>
      {bills ? (
        <>
          <div className="flex flex-col px-6 md:pb-0 pb-20">
            <div className="statistic-section">
              <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 md:gap-10 gap-4 mt-3 mb-10">
                <StatisticCard
                  title={"Toplam Müşteri"}
                  amount={bills?.length}
                  image={"images/user.png"}
                />
                <StatisticCard
                  title={"Toplam Kazanç"}
                  amount={totalAmount()}
                  image={"images/money.png"}
                />
                <StatisticCard
                  title={"Toplam Satış"}
                  amount={bills?.length}
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
          <div className="px-6">
            <Table
              dataSource={bills}
              columns={columns}
              bordered
              pagination={false}
              scroll={{
                y: 1000,
                x: 300,
              }}
              rowKey="_id"
            />
          </div>
        </>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex justify-center"
        />
      )}
    </>
  );
}

export default CustomerPage;
