import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./index.css";

function Header({ setSearch }) {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı bir şekilde yapıldı.");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div>
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div
          className="flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link to="/" className={`menu-link ${pathname === "/" && "active"}`}>
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} className="hidden md:flex">
            <Link
              to="/cart"
              className={`menu-link ${pathname === "/cart" && "active"}`}
            >
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="text-[10px] md:text-xs">Sepet</span>
            </Link>
          </Badge>
          <Link
            to="/bills"
            className={`menu-link ${pathname === "/bills" && "active"}`}
          >
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Fatura</span>
          </Link>
          <Link
            to="/customers"
            className={`menu-link ${pathname === "/customers" && "active"}`}
          >
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">Müşteriler</span>
          </Link>
          {/*<Link
            to="/statistics"
            className={`menu-link ${pathname === "/statistics" && "active"}`}
          >
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="text-[10px] md:text-xs">İstatistikler</span>
        </Link>*/}
          <div onClick={handleLogOut}>
            <Link to="/login" className={`menu-link`}>
              <LogoutOutlined className="text-xl md:text-2xl" />
              <span className="text-[10px] md:text-xs">Çıkış Yap</span>
            </Link>
          </div>
        </div>
        <Badge count={cart.cartItems.length} className="flex md:hidden pr-2">
          <Link
            to="/cart"
            className={`menu-link ${pathname === "/cart" && "active"}`}
          >
            <ShoppingCartOutlined className="text-xl md:text-2xl mb-1" />
            <span className="text-[10px] md:text-xs">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
}

export default Header;
