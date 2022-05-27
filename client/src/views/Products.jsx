import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Products({ props }) {
  const items = [
    { link: "/admin/products/create", text: "Submit product" },
    { link: "/admin/products/actions", text: "Actions menu" },
  ];
  return (
    <section>
      <Title props={{ title: "Products" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
