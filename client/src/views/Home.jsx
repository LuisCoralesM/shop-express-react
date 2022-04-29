import React from "react";
import Title from "../components/menu/Title";
import ItemsDisplay from "../components/items/ItemsDisplay";

export default function Home() {
  // FETCH API to get products images and data
  // To set in front here
  // then send it to ItemsDisplay
  const items = [
    { text: "Camisa numero 1" },
    { text: "Camisa numero 2" },
    { text: "Camisa numero 3" },
  ];

  return (
    <section>
      <Title props={{ title: "Clothing Shop" }} />
      <ItemsDisplay props={{ items: items }}></ItemsDisplay>
    </section>
  );
}
