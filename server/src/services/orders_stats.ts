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
    (item) =>
      new Date(
        item.created_at.getFullYear(),
        item.created_at.getMonth(),
        item.created_at.getDate()
      ) >=
        new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + 1
        ) &&
      new Date(
        item.created_at.getFullYear(),
        item.created_at.getMonth(),
        item.created_at.getDate()
      ) <=
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1
        )
  );
}

export function compareSalesByMonth(orders: Order[], date: Date) {
  let filteredOrders = orders
    .filter(
      (item) =>
        item.created_at.getMonth() === date.getMonth() &&
        item.created_at.getFullYear() === date.getFullYear()
    )
    .sort(
      (a, b) => a.created_at.getMilliseconds() - b.created_at.getMilliseconds()
    )
    .reverse();

  let arr = Array.from(
    {
      length: getDaysInMonth(date.getFullYear(), date.getMonth()),
    },
    (_, i) => (i = 0)
  );

  for (let i = 0; i < arr.length; i++) {
    arr[i] = filteredOrders
      .filter((order) => i === order.created_at.getDate())
      .reduce((acc, a) => acc + a.total, 0);
  }

  return arr;
}

export function ordersByTotals(orders: Order[]) {
  return orders.sort((a, b) => a.total - b.total).reverse();
}

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}
