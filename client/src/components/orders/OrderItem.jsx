import React from "react";

export default function OrderItem({ order }) {
  return order !== undefined ? (
    <div className="flex gap-5 text-lg justify-between border-2 p-2">
      <li className="list-none">
        {"ID: " +
          order.id +
          " - " +
          "Province/Country: " +
          order.province +
          "/" +
          order.country +
          " - " +
          " Total: " +
          order.total +
          " - " +
          "Date: " +
          new Date(order.created_at).toLocaleDateString("en-UK")}
      </li>
    </div>
  ) : (
    <li className="list-none">Order not found</li>
  );
}
