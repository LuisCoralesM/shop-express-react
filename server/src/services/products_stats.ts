import { Product, Order } from "@prisma/client";

type ProdOrd = Product & {
  order: Order | null;
};

export function compareProductSalesByDate(
  product: Order[],
  startDate: Date,
  endDate: Date
) {}

export function compareTwoProducts(ordersOne: Order[], Order: Order[]) {}

export function getProductSales(
  orders: Order[],
  startDate?: Date,
  endDate?: Date
) {}

