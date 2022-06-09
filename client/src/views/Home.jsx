import React, { useState, useEffect } from "react";
import { fetchApi } from "../utils/response";
import Title from "../components/menu/Title";
import ItemsDisplay from "../components/items/ItemsDisplay";

export default function Home() {
  const [items, setItems] = useState([]);
  const [hasClickedItem, setHasClickedItem] = useState(false);

  const cartItems = [];

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi("/api/products/");

      if (!response.ok) return console.log(response.status);

      setItems(response.data.data);
    }
    fetchProducts();
  }, []);

  function addItemsToCart(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }

  return (
    <section>
      <div className="flex justify-between">
        <Title props={{ title: "Clothing Shop" }} />
        {hasClickedItem ? <p className="p-3">Added items to cart</p> : ""}
        <button
          className="border-2 p-2 bg-gray-900 hover:bg-slate-600"
          onClick={() => {
            setHasClickedItem(true);
            addItemsToCart(cartItems);
          }}
        >
          Add to cart
        </button>
      </div>
      <ItemsDisplay
        props={{
          items: items,
          isHome: true,
          cartItems: cartItems,
        }}
      ></ItemsDisplay>
    </section>
  );
}
