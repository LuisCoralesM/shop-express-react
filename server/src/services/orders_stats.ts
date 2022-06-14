import { Order } from "@prisma/client";

export function lastNOrders(orders: Order[], n: number = 3) {
  return orders.slice(0, n);
}

export function compareSalesByDates(
  orders: Order[],
  startDate: Date,
  endDate: Date
) {
  console.log(startDate.toDateString() + " | " + endDate.toDateString());
  console.log(
    orders[0].created_at >= startDate && orders[0].created_at <= endDate
  );

  return orders.filter(
    (item) => item.created_at >= startDate && item.created_at <= endDate
  );
}

export function compareSalesByMonth(
  orders: Order[],
  monthNumber: number = new Date().getMonth()
) {
  return orders.filter(
    (item) => item.created_at.getMonth() === monthNumber - 1
  );
}

export function ordersByTotals(orders: Order[]) {
  return orders.sort((a, b) => a.total - b.total).reverse();
}
