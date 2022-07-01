import { Product, Order } from "@prisma/client";

export function compareTwoProducts(
  productOne: Product | undefined | null,
  productTwo: Product | undefined | null,
  ordersProductOne: Order[],
  ordersProductTwo: Order[]
) {
  return {
    productOneQuantity: ordersProductOne.length,
    productOneSales: (productOne?.unit_price ?? 0) * ordersProductOne.length,
    productOneOrders: ordersProductOne,

    productTwoQuantity: ordersProductTwo.length,
    productTwoSales: (productTwo?.unit_price ?? 0) * ordersProductTwo.length,
    productTwoOrders: ordersProductTwo,
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

export function getProductsSalesByDate(
  orders: Order[],
  products: Product[],
  startDate: Date,
  endDate: Date
) {
  let arrIds = orders
    .filter(
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
    )
    .map((a) => a.products)
    .map((a) => a.map((b) => b))
    .flat();

  let obj = products.map((a) => ({
    id: a.id,
    name: a.title,
    quantity: 0,
    total: 0,
    price: a.unit_price,
  }));

  for (let i = 0; i < arrIds.length; i++) {
    for (let j = 0; j < obj.length; j++) {
      if (obj[j].id === arrIds[i]) {
        obj[j].quantity++;
        obj[j].total = obj[j].price * obj[j].quantity;
      }
    }
  }

  return obj.sort((a, b) => a.quantity - b.quantity).reverse();
}
