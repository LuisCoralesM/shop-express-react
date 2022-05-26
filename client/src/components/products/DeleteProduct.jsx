import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import Card from "../items/Card";

export default function DeleteProduct({ product }) {
  const [isDeleted, setDeleted] = useState(false);

  async function deleteUser(e) {
    e.preventDefault();

    const response = await fetchApi(
      "/dashboard/products/" + product.id,
      "DELETE"
    );

    if (!response.ok) return console.log(response.data.status);

    setDeleted(true);
  }

  return (
    <>
      {!isDeleted ? (
        <>
          <p>Are you sure you want to delete the product?</p>
          <Card key={product?.id} props={product}></Card>
          <form onSubmit={deleteUser}>
            <button
              className="my-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Confirm delete
            </button>
          </form>
        </>
      ) : (
        <p className="mb-3">Product deleted</p>
      )}
    </>
  );
}
