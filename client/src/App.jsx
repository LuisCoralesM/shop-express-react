import React, { useState, useEffect } from "react";
import { fetchApi } from "./utils/response";

export default function App() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function getStatus() {
      try {
        const response = await fetchApi("/status");
        setStatus(response.ok);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
    getStatus();
  }, []);

  return status ? <>Ok</> : "Loading...";
}
