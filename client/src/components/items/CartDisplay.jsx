import React from "react";
import CartItem from "./CartItem";

export default function CartDisplay({ props }) {
  return (
    <div className="flex flex-col gap-5">
      {props.items.map((item, index) => (
        <CartItem key={index} item={item} />
      ))}
    </div>
  );
}
