import React, { useState, useEffect } from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";
import { fetchApi } from "../utils/response";

export default function Admin() {
  const items = [{ link: "/admin/users/", text: "Users" }];

  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) return <p>Loading..</p>;

  return status ? (
    <section>
      <Title props={{ title: "This is admin" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  ) : (
    <p className="font-bold">API Down</p>
  );
}
