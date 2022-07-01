import React, { useState } from "react";
import Title from "../menu/Title";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function MostSoldProducts() {
  const [products, setProducts] = useState([]);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  async function fetchProductsByDates(e) {
    e.preventDefault();

    if (dates.endDate == null || dates.startDate == null) return;

    const response = await fetchApi(
      "/api/dashboard/stats/products/dates/",
      "POST",
      dates
    );

    if (!response.ok) return console.log(response.status);

    setProducts(response.data.data);
  }

  console.log(products);

  return (
    <section>
      <Title
        props={{
          title: "Get most sold products by date",
        }}
      />

      <form onSubmit={fetchProductsByDates} className="flex justify-between">
        <label className="text-lg py-2">Start Date</label>
        <input
          className="w-4/12 bg-gray-700 border-transparent rounded"
          type="date"
          name="startDate"
          onChange={setState(setDates)}
        />
        <label className="text-lg py-2">End Date</label>
        <input
          className="w-4/12 bg-gray-700 border-transparent rounded"
          type="date"
          name="endDate"
          onChange={setState(setDates)}
        />
        <button
          className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col gap-y-5 mt-10">
        {products.map((a) => (
          <p className="text-lg border p-2">
            ID: {a.id} - NAME: {a.name} - QTY: {a.quantity} - TOTAL: {a.total}
          </p>
        ))}
      </div>
    </section>
  );
}
