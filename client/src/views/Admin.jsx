import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Admin() {
  const items = [
    { link: "/admin/users/", text: "Users" },
    { link: "/admin/products/", text: "Products" },
  ];

  return (
    <section>
      <Title props={{ title: "This is admin" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
