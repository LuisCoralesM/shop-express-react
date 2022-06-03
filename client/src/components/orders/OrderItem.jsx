import React from "react";

export default function OrderItem({ order }) {
  return order !== undefined ? (
    <div className="flex gap-5 text-lg justify-between border-2">
      <li className="list-none">
        {order.id +
          " - " +
          order.address +
          " - " +
          order.city +
          " - " +
          order.province +
          " - " +
          order.country +
          " - " +
          order.phone +
          " - " +
          order.created_at +
          " - " +
          order.updated_at}
      </li>
    </div>
  ) : (
    <li className="list-none">Order not found</li>
  );
}
