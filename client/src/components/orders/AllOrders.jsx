import React, { useState, useEffect } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import OrderItem from "./OrderItem";

export default function AllOrders({ order }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const response = await fetchApi("/api/dashboard/orders/");

      if (!response.ok) return console.log(response.data.status);

      setOrders(response.data.data);
    }

    getOrders();
  }, []);

  return (
    <section>
      <Title props={{ title: "All orders" }} />
      <div className="flex flex-col gap-y-7">
        {orders.map((order) => (
          <OrderItem order={order} />
        ))}
      </div>
    </section>
  );
}
