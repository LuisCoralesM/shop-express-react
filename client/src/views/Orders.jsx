import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Orders({ props }) {
  const items = [
    { link: "/admin/orders/search", text: "Search order" },
    { link: "/admin/orders/all", text: "All orders" },
  ];
  return (
    <section>
      <Title props={{ title: "Orders" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
