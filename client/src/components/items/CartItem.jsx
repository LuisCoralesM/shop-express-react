import React from "react";
import shirt from "../../assets/shirt.jpg";

export default function CartItem({ item, setItems }) {
  return (
    <div className="flex gap-5 text-lg justify-between border-2">
      <img className="h-14" src={shirt} alt="img" />
      <p>{item.title}</p>
      <p>{item.unit_price}$</p>
    </div>
  );
}
