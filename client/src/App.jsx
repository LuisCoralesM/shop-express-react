import React, { useState, useEffect } from "react";
import { checkLogin } from "./utils/checkLogin";
import { fetchApi } from "./utils/response";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";

import Users from "./views/Users";
import MyUser from "./components/users/MyUser";
import SearchUser from "./components/users/SearchUser";
import DeleteOwnUser from "./components/users/DeleteOwnUser";

import Error from "./views/Error";

import Admin from "./views/Admin";
import ActionMenu from "./components/users/ActionMenu";

import ProductMenu from "./components/products/ProductMenu";
import Products from "./views/Products";
import CreateProduct from "./components/products/CreateProduct";

import Cart from "./views/Cart";
import Orders from "./views/Orders";
import SearchOrder from "./components/orders/SearchOrder";
import AllOrders from "./components/orders/AllOrders";

export default function App() {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getStatus() {
      try {
        setIsLoading(true);
        const response = await fetchApi("/api/status");
        setStatus(response.ok);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    getStatus();
  }, []);

  useEffect(() => {
    setIsLogged(checkLogin());
  }, []);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem("isAdmin")) ? true : false);
  }, []);

  if (isLoading) return <p>Loading..</p>;

  return status ? (
    <Router>
      <Nav props={{ isAdmin, setIsAdmin }} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/signup"
          element={<Signup props={{ isLogged, setIsLogged }} />}
        />
        <Route
          path="/auth/login"
          element={
            <Login props={{ isLogged, setIsLogged, isAdmin, setIsAdmin }} />
          }
        />

        {isLogged ? (
          <>
            <Route
              path="/auth/logout"
              element={
                <Logout
                  props={{ isLogged, setIsLogged, isAdmin, setIsAdmin }}
                />
              }
            />

            <Route path="/cart" element={<Cart />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        )}

        {isAdmin ? (
          <>
            <Route path="/admin" element={<Admin />} />

            <Route path="/admin/users/" element={<Users />} />
            <Route path="/admin/users/myuser" element={<MyUser />} />
            <Route path="/admin/users/search" element={<SearchUser />} />
            <Route path="/admin/users/edit" element={<DeleteOwnUser />} />
            <Route path="/admin/users/actions" element={<ActionMenu />} />

            <Route path="/admin/products" element={<Products />} />

            <Route path="/admin/products/create" element={<CreateProduct />} />
            <Route path="/admin/products/actions" element={<ProductMenu />} />

            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/search" element={<SearchOrder />} />
            <Route path="/admin/orders/all" element={<AllOrders />} />
          </>
        ) : (
          <Route path="*" element={<Error />} />
        )}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  ) : (
    <p className="font-bold">API Down</p>
  );
}
