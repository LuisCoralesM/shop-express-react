import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import { setState } from "../../utils/hooks";
import Title from "../menu/Title";

export default function CreateOrder({ props }) {
  const [address, setAddress] = useState({
    address: undefined,
    postal_code: undefined,
    city: undefined,
    province: undefined,
    country: undefined,
    phone: undefined,
    payment: undefined,
  });
  const [isOrdered, setIsOrdered] = useState(false);

  async function submitOrder(e) {
    e.preventDefault();

    const products = props.items.map((item) => item.id);

    const response = await fetchApi("/api/dashboard/orders/", "POST", {
      address: address.address,
      postal_code: address.postal_code,
      city: address.city,
      province: address.province,
      country: address.country,
      phone: address.phone,
      total: props.total,
      payment: address.payment,
      products: products,
    });

    if (!response.ok) return console.log(response.data.status);

    localStorage.removeItem("cartItems");
    setIsOrdered(true);
  }

  return (
    <>
      <Title props={{ title: "Set address" }} />
      {!isOrdered ? (
        <>
          <p className="text-lg mt-5">Total: {props.total}$</p>
          <form className="w-full" onSubmit={submitOrder}>
            <label className="text-lg">Address</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="address"
              placeholder="Address..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Postal Code</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="postal_code"
              placeholder="Postal Code..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">City</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="city"
              placeholder="City..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Province</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="province"
              placeholder="Province..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Country</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="country"
              placeholder="Country..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Phone</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="phone"
              placeholder="Phone..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <label className="text-lg">Payment</label>
            <input
              className="w-full bg-gray-700 border-transparent rounded"
              type="text"
              name="payment"
              placeholder="Payment..."
              onChange={setState(setAddress)}
              required
            />
            <br />
            <br />
            <button
              className="mt-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
              type="submit"
            >
              Submit order
            </button>
          </form>
        </>
      ) : (
        <p className="mb-3">Order created!</p>
      )}
    </>
  );
}
