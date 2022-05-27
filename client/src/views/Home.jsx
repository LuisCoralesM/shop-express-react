import React, { useState, useEffect } from "react";
import { fetchApi } from "../utils/response";
import Title from "../components/menu/Title";
import ItemsDisplay from "../components/items/ItemsDisplay";

export default function Home() {
  // FETCH API to get products images and data
  // To set in front here
  // then send it to ItemsDisplay

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi("/api/products/");

      if (!response.ok) return console.log(response.status);

      setItems(response.data.data);
    }
    fetchProducts();
  }, []);

  return (
    <section>
      <Title props={{ title: "Clothing Shop" }} />
      <ItemsDisplay props={{ items: items, isHome: true }}></ItemsDisplay>
    </section>
  );
}
