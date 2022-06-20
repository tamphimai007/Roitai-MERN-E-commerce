import React from "react";
import { Menu, Badge } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";

const Navbar = () => {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  console.log("user Navbar", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        {/* <a href="" ></a>*/}
        <Link to="/">Home</Link>
      </Menu.Item>

      <Menu.Item key="shop" icon={<ShoppingOutlined />}>
        {/* <a href="" ></a>*/}
        <Link to="/shop">Shop</Link>
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        {/* <a href="" ></a>*/}
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>

      {user && (
        <>
          {/* {user.username} */}
          <SubMenu
            style={{ float: "right" }}
            key="SubMenu"
            icon={<DownOutlined />}
            title={user.username}
          >
            {
              user.role == "admin" ? (
                <Menu.Item
                  // icon={<LogoutOutlined />}
                  key="setting:5"
                >
                  <Link to="/admin/index">Dashboard</Link>
                </Menu.Item> //true
              ) : (
                <Menu.Item
                  // icon={<LogoutOutlined />}
                  key="setting:5"
                >
                  <Link to="/user/index">Dashboard</Link>
                </Menu.Item>
              ) //false
            }

            <Menu.Item
              icon={<LogoutOutlined />}
              key="setting:1"
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}

      {!user && (
        <>
          <Menu.Item
            key="mail"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            {/* <a href="" ></a>*/}
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item
            style={{ float: "right" }}
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}

      <span className="p-1" style={{ float: "right" }}>
        <Search />
      </span>
    </Menu>
  );
};

export default Navbar;
