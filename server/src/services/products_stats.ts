import { Product, Order } from "@prisma/client";

export function compareTwoProductsByMonths(
  ordersProductOne: Order[],
  ordersProductTwo: Order[],
  month: number = 3
) {
  return {
    productOne: ordersProductOne.filter(
      (item) => item.created_at.getMonth() === month
    ),
    productTwo: ordersProductTwo.filter(
      (item) => item.created_at.getMonth() === month
    ),
    month,
  };
}

export function getProductSales(orders: Order[], product: Product) {
  return orders.map((order) => ({
    date: order.created_at,
    price: product.unit_price,
  }));
}
