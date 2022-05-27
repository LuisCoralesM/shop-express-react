import React, { useState } from "react";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function CreateProduct(props) {
  const [newProduct, setNewProduct] = useState({
    title: undefined,
    description: undefined,
    unit_price: undefined,
    image: undefined,
    sale: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function createProduct(e) {
    e.preventDefault();

    const response = await fetchApi("/api/dashboard/products/", "POST", {
      title: newProduct.title,
      description: newProduct.description,
      unit_price: newProduct.unit_price,
      image: newProduct.image,
      sale: newProduct.sale,
    });

    if (!response.ok) return console.log(response.data.status);

    setIsSubmitted(true);
  }

  return (
    <section>
      <Title props={{ title: "Create new product" }} />
      {isSubmitted ? (
        <p>Product submitted</p>
      ) : (
        <form className="w-full" onSubmit={createProduct}>
          <label className="text-lg">Title</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="title"
            placeholder="Title..."
            onChange={setState(setNewProduct)}
            required
          />
          <br />
          <br />
          <label className="text-lg">Description</label>
          <textarea
            className="w-full bg-gray-700 border-transparent rounded"
            rows="5"
            type="text"
            name="description"
            placeholder="Description..."
            onChange={setState(setNewProduct)}
            required
          />
          <br />
          <br />
          <label className="text-lg">Unit Price</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="unit_price"
            placeholder="Price..."
            onChange={setState(setNewProduct)}
            required
          />
          <br />
          <br />
          {/* <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="file"
            name="image"
            placeholder="image"
            onChange={setState(setNewProduct)}
            required
          />
          <br />
          <br /> */}
          <label className="text-lg">Sale</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="sale"
            placeholder="Sale..."
            onChange={setState(setNewProduct)}
            required
          />
          <br />
          <br />
          <button
            className="mt-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
}
