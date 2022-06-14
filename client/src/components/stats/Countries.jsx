import React, { useState, useEffect } from "react";
import Title from "../menu/Title";
import { fetchApi } from "../../utils/response";

import { Doughnut } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { colorGenerator } from "../../utils/colorGenerator";
Chart.register(CategoryScale);

export default function Countries() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSalesByCountry() {
      const response = await fetchApi("/api/dashboard/orders/country/");

      if (!response.ok) return console.log(response.status);

      setSales(response.data.data);
    }
    fetchSalesByCountry();
  }, []);

  return (
    <>
      <section>
        <Title
          props={{
            title: "Total sales by countries",
          }}
        />
        <div className="flex justify-center bg-gray-200 h-96">
          <Doughnut
            options={{ maintainAspectRatio: false }}
            data={{
              datasets: [
                {
                  data: sales.map((a) => a._sum.total),
                  backgroundColor: sales.map((a) => colorGenerator()),
                },
              ],

              labels: sales.map((a) => a.country),
            }}
          />
        </div>
      </section>
    </>
  );
}
