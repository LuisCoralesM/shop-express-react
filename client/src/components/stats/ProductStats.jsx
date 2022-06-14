import React, { useEffect, useState } from "react";
import Title from "../menu/Title";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";
import OrderItem from "../orders/OrderItem";

export default function ProductStats() {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState();
  const [productToSearch, setProductsToSearch] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi("/api/products/");

      if (!response.ok) return console.log(response.status);

      setProducts(response.data.data);
    }
    fetchProducts();
  }, []);

  async function fetchProductStats(e) {
    e.preventDefault();

    if (productToSearch !== 0) return;

    const response = await fetchApi(
      "/api/dashboard/stats/products/" + e.target.value
    );

    console.log(response);
    if (!response.ok) return console.log(response.status);

    setFilteredProduct(response.data.data);
  }
  console.log(filteredProduct);

  return (
    <>
      <section>
        <Title
          props={{
            title: "Get product stats",
          }}
        />

        <form
          onSubmit={fetchProductStats}
          className="flex justify-between w-full"
        >
          <label className="text-lg py-2">Product 1</label>
          <select
            className="w-4/12 bg-gray-700 border-transparent rounded"
            name="productOneID"
            onChange={fetchProductStats}
          >
            <option value="-">-</option>
            {products.map((a) => (
              <option>{a.id}</option>
            ))}
          </select>
          <button
            className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="flex gap-x-3 mt-5 justify-between">
          <div className="bg-black w-full border text-lg p-5 flex flex-col text-center">
            <p>Product data</p>
            <p>Sales: {filteredProduct?.total}</p>
            <p className="mb-3">Quantity: {filteredProduct?.quantity}</p>
            <p>Orders:</p>
            {filteredProduct?.orders.map((a) => (
              <>
                <p>
                  ID: {a.id} - Date: {a.date}
                </p>
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
