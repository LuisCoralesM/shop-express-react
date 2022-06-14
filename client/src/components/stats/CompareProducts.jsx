import React, { useEffect, useState } from "react";
import Title from "../menu/Title";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function CompareProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsToSearch, setProductsToSearch] = useState({
    productOneID: undefined,
    productTwoID: undefined,
  });

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi("/api/products/");

      if (!response.ok) return console.log(response.status);

      setProducts(response.data.data);
    }
    fetchProducts();
  }, []);

  async function fetchProductsCompare(e) {
    e.preventDefault();

    if (
      productsToSearch.productOneID == null ||
      productsToSearch.productTwoID == null
    )
      return;

    const response = await fetchApi(
      "/api/dashboard/stats/products/compare",
      "POST",
      productsToSearch
    );

    console.log(response);
    if (!response.ok) return console.log(response.status);

    setFilteredProducts(response.data.data);
  }

  console.log(filteredProducts);

  return (
    <section>
      <Title
        props={{
          title: "Compare products",
        }}
      />

      <form
        onSubmit={fetchProductsCompare}
        className="flex justify-between w-full"
      >
        <label className="text-lg py-2">Product 1</label>
        <select
          className="w-4/12 bg-gray-700 border-transparent rounded"
          name="productOneID"
          onChange={setState(setProductsToSearch)}
        >
          {products.map((a) => (
            <option>{a.id}</option>
          ))}
        </select>
        <label className="text-lg py-2">Product 2</label>
        <select
          className="w-4/12 bg-gray-700 border-transparent rounded"
          name="productTwoID"
          onChange={setState(setProductsToSearch)}
        >
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
          <p>Product 1 data</p>
          <p>Sales: {filteredProducts.productOneSales}</p>
          <p>Quantity: {filteredProducts.productOneQuantity}</p>
        </div>
        <div className="bg-black w-full border text-lg p-5 flex flex-col text-center">
          <p>Product 2 data</p>
          <p>Sales: {filteredProducts.productTwoSales}</p>
          <p>Quantity: {filteredProducts.productTwoQuantity}</p>
        </div>
      </div>
    </section>
  );
}
