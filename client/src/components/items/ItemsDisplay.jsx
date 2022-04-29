import React from "react";
import Card from "./Card";

export default function ItemsDisplay({ props }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {props.items.map((item, index) => (
        <Card key={index} props={item} />
      ))}
    </div>
  );
}
