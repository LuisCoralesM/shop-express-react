import { Order } from "@prisma/client";

export function lastNOrders(orders: Order[], n: number = 3) {
  return orders.slice(0, n);
}

export function ordersByTotals(orders: Order[], n: number = 3) {
  return orders.sort((a, b) => a.total - b.total).reverse();
}
