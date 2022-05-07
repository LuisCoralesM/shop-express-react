import React from "react";
import Button from "./Button";

export default function MenuButtons({ props }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {props.items.map((item, index) => (
        <Button key={index} props={{ link: item.link, text: item.text }} />
      ))}
    </div>
  );
}
