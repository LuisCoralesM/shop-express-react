import React, { useState, useEffect } from "react";
import { checkLogin } from "../../utils/checkLogin";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function Signup({ props }) {
  const [user, setUser] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    username: undefined,
  });

  const [hasRegistered, setHasRegistered] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const logged = checkLogin();
    setIsLogged(logged);
    props.setIsLogged(logged);
  }, [props]);

  async function signupUser(e) {
    try {
      e.preventDefault();

      const response = await fetchApi("/auth/signup/", "POST", {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
      });

      console.log(response.data);

      if (!response.ok) return console.log(response.data.status);

      setHasRegistered(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="mt-3">
      <div className="w-full flex justify-center">
        {isLogged ? (
          <p className="font-bold">You are logged!</p>
        ) : !hasRegistered ? (
          <form
            className="w-4/5 bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={signupUser}
          >
            <Title props={{ title: "Register" }} />

            <div className="mb-3">
              <label className="block text-sm mb-2">First name</label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="firstName"
                placeholder="John"
                onChange={setState(setUser)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-2">Last name</label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="lastName"
                placeholder="Doe..."
                onChange={setState(setUser)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="john@email.com"
                onChange={setState(setUser)}
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="bg-gray-700 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                onChange={setState(setUser)}
                required
                minLength="8"
                maxLength="12"
              />
            </div>

            <button
              className="flex-shrink-0 border-transparent border-2 bg-gray-900 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Register
            </button>
          </form>
        ) : (
          <p className="font-bold">Has registered!</p>
        )}
      </div>
    </section>
  );
}
