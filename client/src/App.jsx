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
import DeleteUser from "./components/users/DeleteUser";
import ListUsers from "./components/users/ListUser";
import SearchUser from "./components/users/SearchUser";

import Error from "./views/Error";

import Admin from "./views/Admin";
import AdminNav from "./components/nav/AdminNav";
import AdminAuth from "./components/auth/AdminAuth";

export default function App() {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getStatus() {
      try {
        setIsLoading(true);
        const response = await fetchApi("/status");
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
    setIsAdmin(checkLogin("isAdmin"));
  }, []);

  console.log(isAdmin);

  if (isLoading) return <p>Loading..</p>;

  return status ? (
    <Router>
      {isAdmin ? (
        <>
          <AdminNav />
          <Routes>
            <Route path="/admin" element={<Admin />} />

            <Route path="/" element={<Home />} />
            <Route
              path="/auth/signup"
              element={<Signup props={{ isLogged, setIsLogged }} />}
            />
            <Route
              path="/auth/login"
              element={<Login props={{ isLogged, setIsLogged }} />}
            />

            {isLogged ? (
              <>
                <Route
                  path="/auth/logout"
                  element={<Logout props={{ isLogged, setIsLogged }} />}
                />

                <Route path="/dashboard/users/" element={<Users />} />
                <Route path="/dashboard/users/myuser" element={<MyUser />} />
                <Route path="/dashboard/users/list" element={<ListUsers />} />
                <Route
                  path="/dashboard/users/search"
                  element={<SearchUser />}
                />
                <Route path="/dashboard/users/edit" element={<DeleteUser />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      ) : (
        <>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth/signup"
              element={<Signup props={{ isLogged, setIsLogged }} />}
            />
            <Route
              path="/auth/login"
              element={<Login props={{ isLogged, setIsLogged }} />}
            />

            <Route
              path="/admin/login"
              element={<AdminAuth props={setIsAdmin} />}
            />

            {isLogged ? (
              <>
                <Route
                  path="/auth/logout"
                  element={<Logout props={{ isLogged, setIsLogged }} />}
                />

                <Route path="/dashboard/users/" element={<Users />} />
                <Route path="/dashboard/users/myuser" element={<MyUser />} />
                <Route path="/dashboard/users/list" element={<ListUsers />} />
                <Route
                  path="/dashboard/users/search"
                  element={<SearchUser />}
                />
                <Route path="/dashboard/users/edit" element={<DeleteUser />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/auth/login" replace />} />
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </>
      )}
    </Router>
  ) : (
    <p className="font-bold">API Down</p>
  );
}
