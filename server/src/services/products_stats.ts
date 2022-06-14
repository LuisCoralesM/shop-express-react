import { Product, Order } from "@prisma/client";

export function compareTwoProductsByMonth(
  productOne: Product | undefined | null,
  productTwo: Product | undefined | null,
  ordersProductOne: Order[],
  ordersProductTwo: Order[],
  month: number = 3
) {
  return {
    productOneQuantity: ordersProductOne.length,
    productOneSales: (productOne?.unit_price ?? 0) * ordersProductOne.length,
    productOneOrders: ordersProductOne.filter(
      (item) => item.created_at.getMonth() === month - 1
    ),

    productTwoQuantity: ordersProductTwo.length,
    productTwoSales: (productTwo?.unit_price ?? 0) * ordersProductTwo.length,
    productTwoOrders: ordersProductTwo.filter(
      (item) => item.created_at.getMonth() === month - 1
    ),
    month,
  };
}

export function getProductSales(
  orders: Order[],
  product: Product | undefined | null
) {
  return {
    product: product,
    total: orders.reduce((acc) => acc + (product?.unit_price ?? 0), 0),
    quantity: orders.length,
    orders: orders.map((order) => ({
      id: order.id,
      date: order.created_at,
    })),
  };
}
