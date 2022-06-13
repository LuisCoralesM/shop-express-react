import { Order } from "@prisma/client";

export function lastNOrders(orders: Order[], n: number = 3) {
  return orders.slice(0, n);
}

export function compareSalesByDates(
  orders: Order[],
  startDate: Date,
  endDate: Date
) {
  return orders.filter(
    (item) => item.created_at >= startDate && item.created_at <= endDate
  );
}

export function compareSalesByMonth(
  orders: Order[],
  monthNumber: number = new Date().getMonth()
) {
  return orders.filter((item) => item.created_at.getMonth() === monthNumber);
}

export function ordersByTotals(orders: Order[], n: number = 3) {
  return orders.sort((a, b) => a.total - b.total).reverse();
}
