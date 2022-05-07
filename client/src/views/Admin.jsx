import React, { useState, useEffect } from "react";
import { checkLogin } from "../utils/checkLogin";
import { fetchApi } from "../utils/response";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminNav from "../components/nav/AdminNav";

export default function Admin() {
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

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

  if (isLoading) return <p>Loading..</p>;

  return status ? "THIS IS ADMIN" : <p className="font-bold">API Down</p>;
}
