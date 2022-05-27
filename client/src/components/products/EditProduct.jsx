import React, { useState } from "react";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function EditProduct({ product }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    title: product.title,
    description: product.description,
    unit_price: product.unit_price,
    image: product.image,
    sale: product.sale,
  });

  async function updateProduct(e) {
    e.preventDefault();

    const response = await fetchApi(
      "/api/dashboard/products/" + product.id,
      "PUT",
      {
        title: editedProduct.title,
        description: editedProduct.description,
        unit_price: editedProduct.unit_price,
        image: editedProduct.image,
        sale: editedProduct.sale,
      }
    );

    if (!response.ok) return console.log(response.data.status);

    setIsUpdated(true);
  }

  return (
    <>
      <Title props={{ title: "Update product" }} />

      {!isUpdated ? (
        <form className="w-full" onSubmit={updateProduct}>
          <label className="text-lg">Title</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="title"
            id="title-input"
            defaultValue={product ? product.title : ""}
            onChange={setState(setEditedProduct)}
          />
          <br />
          <br />
          <label className="text-lg">Description</label>
          <textarea
            className="w-full bg-gray-700 border-transparent rounded"
            rows="5"
            type="text"
            defaultValue={product ? product.description : ""}
            name="description"
            id="description-input"
            onChange={setState(setEditedProduct)}
          />
          <br />
          <br />
          <label className="text-lg">Unit Price</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="unit_price"
            id="price-input"
            defaultValue={product ? product.unit_price : ""}
            onChange={setState(setEditedProduct)}
          />
          <br />
          <br />
          <label className="text-lg">Sale</label>
          <input
            className="w-full bg-gray-700 border-transparent rounded"
            type="text"
            name="sale"
            id="sale-input"
            defaultValue={product ? product.sale : ""}
            onChange={setState(setEditedProduct)}
          />
          <br />
          <br />
          <button
            className="my-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="mb-3">Product updated!</p>
      )}
    </>
  );
}
