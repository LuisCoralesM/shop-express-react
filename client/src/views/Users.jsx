import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Users({ props }) {
  const items = [
    { link: "/dashboard/users/myuser", text: "My user" },
    { link: "/dashboard/users/list", text: "List users" },
    { link: "/dashboard/users/search", text: "Search user by id" },
    { link: "/dashboard/users/edit", text: "Delete user" },
  ];
  return (
    <section>
      <Title props={{ title: "Users" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
