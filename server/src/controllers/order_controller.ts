import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/** To GET orders route */
export async function getOrders(req: Request, res: Response) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
    });

    return res.status(200).json({
      data: orders,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST order route */
export async function postOrder(req: Request, res: Response) {
  try {
    const order = await prisma.order.create({
      data: {
        address: req.body.address,
        postal_code: req.body.postal_code,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        phone: req.body.phone,
        total: Number(req.body.total),
        payment: req.body.payment,

        products: {
          connect: req.body.products.map((id: Number) => ({ id: id })),
        },
      },
    });

    return res.status(200).json({
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET one order route */
export async function getOneOrder(req: Request, res: Response) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        products: true,
      },
    });

    return res.status(200).json({
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT order route */
export async function putOrder(req: Request, res: Response) {
  try {
    const order = await prisma.order.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        address: req.body.address,
        postal_code: req.body.postal_code,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        phone: req.body.phone,
      },
    });

    return res.status(200).json({
      data: order,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
