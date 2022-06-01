import React from "react";
import CartItem from "./CartItem";

export default function CartDisplay({ props }) {
  console.log(props);
  return (
    <div className="flex flex-col gap-5">
      {props.items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
