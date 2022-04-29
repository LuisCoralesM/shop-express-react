import React from "react";
import MenuButtons from "../components/menu/MenuButtons";
import Title from "../components/menu/Title";

export default function Admin({ props }) {
  const items = [{ link: "/dashboard/users/myuser", text: "My user" }];
  return (
    <section>
      <Title props={{ title: "Admin" }} />
      <MenuButtons props={{ items: items }}></MenuButtons>
    </section>
  );
}
