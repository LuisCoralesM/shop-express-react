import React, { useState, useEffect } from "react";
import Button from "../components/menu/Button";
import Title from "../components/menu/Title";
import OrderItem from "../components/orders/OrderItem";
import { getDaysInMonth, getMonthName } from "../utils/getDateName";
import { fetchApi } from "../utils/response";

import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState([]);
  const [date, setDate] = useState(new Date());
  const [today] = useState(new Date());
  const [buttons] = useState([0, 0]);

  useEffect(() => {
    async function fetchLatestOrders() {
      const response = await fetchApi("/api/dashboard/orders/latest/3");

      if (!response.ok) return console.log(response.status);

      setOrders(response.data.data);
    }
    fetchLatestOrders();
  }, []);

  useEffect(() => {
    async function fetchSales() {
      const response = await fetchApi("/api/dashboard/stats/orders/", "POST", {
        date: date,
      });

      if (!response.ok) return console.log(response.status);

      setSales(response.data.data);
    }
    fetchSales();
  }, [date]);

  return (
    <>
      <section>
        <div className="flex justify-center">
          <Title props={{ title: "Latest orders" }} />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-x-3">
          {orders.map((order) => (
            <OrderItem order={order} />
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Button props={{ link: "/admin/orders", text: "Check orders" }} />
        </div>
      </section>

      <section>
        <div className="flex justify-center">
          <Title
            props={{
              title:
                "Total sales on " +
                getMonthName(date) +
                " " +
                date.getFullYear(),
            }}
          />
        </div>
        <div className="flex justify-center bg-white h-96">
          <Line
            options={{ maintainAspectRatio: false }}
            data={{
              labels: Array.from(
                {
                  length: getDaysInMonth(
                    date.getFullYear(),
                    date.getMonth() + 1
                  ),
                },
                (_, i) => i + 1
              ),
              datasets: [
                {
                  id: 1,
                  label: "Orders totals",
                  data: sales,
                  borderWidth: 5,
                  pointRadius: 5,
                  backgroundColor: "black",
                },
              ],
            }}
          />
        </div>

        <div className="flex justify-center mt-5 gap-x-3">
          <button
            className="rounded-lg px-4 py-2 border-2 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 hover:text-gray-900 duration-300"
            onClick={() => {
              buttons[0]++;
              buttons[1]--;
              setDate(
                new Date(new Date().setMonth(today.getMonth() - buttons[0]))
              );
            }}
          >
            Previous month
          </button>
          <button
            className="rounded-lg px-4 py-2 border-2 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 hover:text-gray-900 duration-300"
            onClick={() => {
              buttons[0]--;
              buttons[1]++;
              setDate(
                new Date(new Date().setMonth(today.getMonth() + buttons[1]))
              );
            }}
          >
            Next month
          </button>
        </div>
        <div className="flex justify-center mt-5 gap-x-3">
          <Button
            props={{
              link: "/admin/stats/orders/country/",
              text: "Countries chart",
            }}
          />
          <Button
            props={{
              link: "/admin/stats/orders/compare",
              text: "Get sales dates",
            }}
          />
        </div>
      </section>

      <section>
        <div className="flex justify-center">
          <Title props={{ title: "Products" }} />
        </div>

        <div className="flex justify-center mt-5 gap-x-3">
          <Button
            props={{ link: "/admin/stats/products/", text: "Get products stats" }}
          />
          <Button
            props={{ link: "/admin/stats/products/compare", text: "Compare products" }}
          />
          <Button
            props={{ link: "/admin/products", text: "Manage products" }}
          />
        </div>
      </section>
    </>
  );
}
