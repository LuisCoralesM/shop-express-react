import React, { useState, useEffect } from "react";
import Title from "../components/menu/Title";
import CartDisplay from "../components/items/CartDisplay";
import CreateOrder from "../components/cart/CreateOrder";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState();
  const [hasClickedBuy, setHasClickedBuy] = useState(false);
  const [hasClickedEmpty, setHasClickedEmpty] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems != null) {
      setTotal(cartItems.reduce((acc, item) => item.unit_price + acc, 0));
      setItems(cartItems);
    }
  }, []);

  function removeItems() {
    localStorage.removeItem("cartItems");
    setHasClickedEmpty(true);
  }

  return (
    <section>
      <Title props={{ title: "My cart" }} />
      {items.length === 0 || hasClickedEmpty ? (
        <p>Cart is empty!</p>
      ) : hasClickedBuy ? (
        <CreateOrder props={{ items: items, total: total }} />
      ) : (
        <>
          <CartDisplay props={{ items }} />
          <p className="text-lg mt-5">Total: {total}$</p>
          <button
            className="border-2 text-lg mt-5 mr-10"
            onClick={() => removeItems()}
          >
            Empty Cart
          </button>
          <button
            className="mt-5 text-lg border-2"
            onClick={() => setHasClickedBuy(true)}
          >
            Place order
          </button>
        </>
      )}
    </section>
  );
}
