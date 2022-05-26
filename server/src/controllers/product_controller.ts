import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/** To GET products route */
export async function getProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();

    return res.status(200).json({
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST product route */
export async function postProduct(req: Request, res: Response) {
  try {
    const products = await prisma.product.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        unit_price: Number(req.body.unit_price),
        image: req.body.image,
        sale: Number(req.body.sale),
      },
    });

    return res.status(200).json({
      data: products,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET one product route */
export async function getOneProduct(req: Request, res: Response) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json({
      data: product,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT product route */
export async function putProduct(req: Request, res: Response) {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
        unit_price: Number(req.body.unit_price),
        image: req.body.image,
        sale: Number(req.body.sale),
      },
    });

    return res.status(200).json({
      data: product,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT product route */
export async function deleteProduct(req: Request, res: Response) {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.status(200).json({
      data: product,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
