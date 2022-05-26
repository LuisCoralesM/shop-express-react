import React, { useState, useEffect } from "react";
import { fetchApi } from "../../utils/response";
import Card from "../items/Card";
import Title from "../menu/Title";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./EditProduct";

export default function ProductMenu({ props }) {
  const [products, setProducts] = useState([]);
  const [id, setId] = useState();
  const [hasClickedDelete, setHasClickedDelete] = useState(false);
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi("/dashboard/products/");

      if (!response.ok) return console.log(response.status);

      setProducts(response.data.data);
    }
    fetchProducts();
  }, []);

  return (
    <section>
      <Title props={{ title: "Actions menu" }} />
      {hasClickedEdit ? (
        <EditProduct product={products.find((product) => product.id === id)} />
      ) : (
        ""
      )}
      {hasClickedDelete ? (
        <DeleteProduct
          product={products.find((product) => product.id === id)}
        />
      ) : (
        ""
      )}
      {!hasClickedDelete && !hasClickedEdit ? (
        <>
          {products.map((product) => (
            <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1 items-center justify-between">
              <Card key={product?.id} props={product}></Card>
              <div className="flex gap-x-1">
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(product.id);
                    setHasClickedEdit(true);
                    setHasClickedDelete(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(product.id);
                    setHasClickedDelete(true);
                    setHasClickedEdit(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </section>
  );
}
