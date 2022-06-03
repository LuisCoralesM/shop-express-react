import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import { setState } from "../../utils/hooks";
import Title from "../menu/Title";

export default function EditOrder({ order }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState({
    address: order.address,
    postal_code: order.postal_code,
    city: order.city,
    province: order.province,
    country: order.country,
    phone: order.phone,
  });

  async function updateOrder(e) {
    e.preventDefault();

    const response = await fetchApi(
      "/api/dashboard/orders/" + order.id,
      "PUT",
      {
        address: updatedOrder.address,
        postal_code: updatedOrder.postal_code,
        city: updatedOrder.city,
        province: updatedOrder.province,
        country: updatedOrder.country,
        phone: updatedOrder.phone,
      }
    );

    if (!response.ok) return console.log(response.data.status);

    setIsUpdated(true);
  }

  return (
    <>
      <Title props={{ title: "Set address" }} />
      {!isUpdated ? (
        <>
          <form className="w-full" onSubmit={updateOrder}>
            <label className="text-lg">Address</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="address"
              defaultValue={order ? order.address : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Postal Code</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="postal_code"
              defaultValue={order ? order.postal_code : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <label className="text-lg">City</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="city"
              defaultValue={order ? order.city : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Province</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="province"
              defaultValue={order ? order.province : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Country</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="country"
              defaultValue={order ? order.country : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Phone</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="phone"
              defaultValue={order ? order.phone : ""}
              onChange={setState(setUpdatedOrder)}
              required
            />
            <br />
            <br />
            <button
              className="mt-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Update order
            </button>
          </form>
        </>
      ) : (
        <p className="mb-3">Order updated!</p>
      )}
    </>
  );
}
