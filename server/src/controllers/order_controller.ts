import { Request, Response } from "express";
import {
  createOrder,
  findAllOrders,
  findUniqueOrder,
  updateOrder,
} from "../data/orders_data";

/** To GET orders route */
export async function getOrders(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllOrders(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST order route */
export async function postOrder(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await createOrder(
        req.body.address,
        req.body.postal_code,
        req.body.city,
        req.body.province,
        req.body.country,
        req.body.phone,
        req.body.total,
        req.body.payment,
        req.body.products
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET one order route */
export async function getOneOrder(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueOrder(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT order route */
export async function putOrder(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await updateOrder(
        Number(req.params.id),
        req.body.address,
        req.body.postal_code,
        req.body.city,
        req.body.province,
        req.body.country,
        req.body.phone
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
