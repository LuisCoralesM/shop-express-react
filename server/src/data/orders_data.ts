import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAllOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (e) {
    return [];
  }
}

export async function findAllOrdersByCountry() {
  try {
    return await prisma.order.groupBy({
      by: ["country"],
      _sum: {
        total: true,
      },
    });
  } catch (e) {
    return [];
  }
}

export async function findAllOrdersByProduct(id: number) {
  try {
    return await prisma.order.findMany({
      where: {
        products: {
          has: id,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  } catch (e) {
    return [];
  }
}

export async function findUniqueOrder(id: number) {
  try {
    return await prisma.order.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function createOrder(
  address: string,
  postal_code: string,
  city: string,
  province: string,
  country: string,
  phone: string,
  total: number,
  payment: string,
  products: number[]
) {
  try {
    return await prisma.order.create({
      data: {
        address,
        postal_code,
        city,
        province,
        country,
        phone,
        total,
        payment,
        products: products.map((id: number) => id),
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function updateOrder(
  id: number,
  address: string,
  postal_code: string,
  city: string,
  province: string,
  country: string,
  phone: string
) {
  try {
    return await prisma.order.update({
      where: {
        id,
      },
      data: {
        address,
        postal_code,
        city,
        province,
        country,
        phone,
      },
    });
  } catch (error) {
    return undefined;
  }
}
