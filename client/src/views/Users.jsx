import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Users({ props }) {
  const items = [
    { link: "/admin/users/myuser", text: "My user" },
    { link: "/admin/users/search", text: "Search user by email" },
    { link: "/admin/users/edit", text: "Delete own user" },
    { link: "/admin/users/actions", text: "Actions menu" },
  ];
  return (
    <section>
      <Title props={{ title: "Users" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
