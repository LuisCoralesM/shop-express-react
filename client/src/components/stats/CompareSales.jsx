import React, { useState } from "react";
import Title from "../menu/Title";
import OrderItem from "../orders/OrderItem";
import { setState } from "../../utils/hooks";
import { fetchApi } from "../../utils/response";

export default function CompareSales() {
  const [sales, setSales] = useState([]);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  async function fetchSalesByCountry(e) {
    e.preventDefault();

    if (dates.endDate == null || dates.startDate == null) return;

    const response = await fetchApi(
      "/api/dashboard/stats/orders/dates/",
      "POST",
      dates
    );

    console.log(response);
    if (!response.ok) return console.log(response.status);

    setSales(response.data.data);
  }

  return (
    <section>
      <Title
        props={{
          title: "Get sales by date",
        }}
      />

      <form onSubmit={fetchSalesByCountry} className="flex justify-between">
        <label>Start Date</label>
        <input
          className="w-4/12 bg-gray-700 border-transparent rounded"
          type="date"
          name="startDate"
          onChange={setState(setDates)}
        />
        <label>End Date</label>
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

      <div className="flex flex-col gap-y-5 mt-5">
        {sales.map((a, i) => (
          <OrderItem key={i} order={a} />
        ))}
      </div>
    </section>
  );
}
