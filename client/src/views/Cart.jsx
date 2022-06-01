import React, { useState, useEffect } from "react";
import { fetchApi } from "../utils/response";
import Title from "../components/menu/Title";
import CartDisplay from "../components/items/CartDisplay";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    setTotal(cartItems.reduce((acc, item) => item.unit_price + acc, 0));
    setItems(cartItems);
  }, []);

  async function buyItems(e) {
    e.preventDefault();

    const response = await fetchApi("/api/dashboard/orders/", "POST");

    if (!response.ok) return console.log(response.data.status);

    //NAVIGATE TO "SUCCESFUL ORDER" VIEW
  }

  return (
    <section>
      <Title props={{ title: "My cart" }} />
      <CartDisplay props={{ items }} />
      <p className="text-lg mt-5">Total: {total}$</p>
      <button className="mt-5 text-lg border-2" onClick={() => buyItems()}>
        Place order
      </button>
    </section>
  );
}
