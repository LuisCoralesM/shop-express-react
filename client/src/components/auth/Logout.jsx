import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchApi } from "../../utils/response";

export default function Logout({ props }) {
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    setIsLogged(props.isLogged);
  }, [props.isLogged]);

  async function logout(e) {
    e.preventDefault();

    const response = await fetchApi("/auth/logout", "POST");

    console.log(response.data);

    if (!response.ok) return console.log(response.data.status);

    localStorage.clear();
    setHasLoggedOut(true);
    props.setIsLogged(false);

    props.setIsAdmin(false);
    navigate("/");
  }

  return (
    <section>
      {!isLogged ? (
        <Navigate to="/auth/login" replace />
      ) : !hasLoggedOut ? (
        <form onSubmit={logout}>
          <button
            className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Logout
          </button>
        </form>
      ) : (
        <p className="font-bold">You have logged out!</p>
      )}
    </section>
  );
}
