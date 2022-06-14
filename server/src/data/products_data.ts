import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findAllProducts() {
  try {
    return await prisma.product.findMany();
  } catch (e) {
    return [];
  }
}

export async function findUniqueProduct(id: number) {
  try {
    return await prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function createProduct(
  title: string,
  description: string,
  unit_price: number,
  image: string,
  sale: number
) {
  try {
    return await prisma.product.create({
      data: {
        title,
        description,
        unit_price,
        image,
        sale,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function updateProduct(
  id: number,
  title: string,
  description: string,
  unit_price: number,
  image: string,
  sale: number
) {
  try {
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        unit_price,
        image,
        sale,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function deleteProducts(id: number) {
  try {
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  } catch (error) {
    return undefined;
  }
}
