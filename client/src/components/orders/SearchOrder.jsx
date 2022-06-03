import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import EditOrder from "./EditOrder";
import OrderItem from "./OrderItem";

export default function OrderMenu({ props }) {
  const [order, setOrder] = useState();
  const [id, setId] = useState();
  const [hasSearched, setHasSearch] = useState(false);
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  async function fetchOrders(e) {
    e.preventDefault();
    setHasSearch(true);
    setHasClickedEdit(false);

    const response = await fetchApi("/api/dashboard/orders/" + id);

    if (!response.ok) return console.log(response.status);

    console.log(response.data.data);
    setOrder(response.data.data);
  }

  return (
    <section>
      <Title props={{ title: "Searching order by id" }} />
      <form
        className="w-full max-w-sm mb-3 flex align-middle"
        onSubmit={fetchOrders}
      >
        <input
          className="bg-gray-700 border-transparent rounded"
          type="text"
          placeholder="get by id"
          name="id"
          id="search-input"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="flex-shrink-0 ml-1 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
      {hasSearched && hasClickedEdit ? (
        <EditOrder order={order} />
      ) : hasSearched ? (
        <div
          className="hover:cursor-pointer hover:bg-slate-200 hover:text-gray-900"
          onClick={() => setHasClickedEdit(true)}
        >
          <OrderItem key={order?.id} order={order}></OrderItem>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
