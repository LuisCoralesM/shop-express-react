import React, { useState, useEffect } from "react";
import { checkLogin } from "../../utils/checkLogin";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function Login({ props }) {
  const [user, setUser] = useState({
    email: undefined,
    password: undefined,
  });
  const [hasLogged, setHasLogged] = useState(false);

  useEffect(() => {
    setHasLogged(checkLogin());
  }, []);

  async function loginUser(e) {
    e.preventDefault();

    const response = await fetchApi("/api/auth/login/", "POST", {
      email: user.email,
      password: user.password,
    });

    if (!response.ok) return console.log(response.data.status);

    localStorage.setItem("isLogged", JSON.stringify(response.data.isLogged));
    localStorage.setItem(
      "isAdmin",
      JSON.stringify(response.data.isAdmin === "ADMIN" ? true : false)
    );

    setHasLogged(true);
    props.setIsAdmin(response.data.isAdmin === "ADMIN" ? true : false);
    props.setIsLogged(true);
  }

  return (
    <section className="mt-3">
      <div className="w-full flex justify-center">
        {!hasLogged ? (
          <>
            <a href="http://localhost:5000/login">
              <button
                className="flex-shrink-0 border-transparent border-2 bg-gray-900 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                type="submit"
              >
                Login from Auth0
              </button>
            </a>
            <form
              className="w-4/5 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={loginUser}
            >
              <div className="mb-4">
                <label className="block text-sm mb-2" htmlFor="username">
                  Email
                </label>
                <input
                  className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  onChange={setState(setUser)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="password"
                  onChange={setState(setUser)}
                  required
                />
              </div>

              <button
                className="flex-shrink-0 border-transparent border-2 bg-gray-900 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                type="submit"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <p className="font-bold">Has logged!</p>
        )}
      </div>
    </section>
  );
}
