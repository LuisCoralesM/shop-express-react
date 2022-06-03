import React from "react";
import Card from "./Card";

export default function ItemsDisplay({ props }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {props.items.map((item) => (
        <Card
          key={item.id}
          props={item}
          isHome={props.isHome}
          cartItems={props.cartItems}
        />
      ))}
    </div>
  );
}
