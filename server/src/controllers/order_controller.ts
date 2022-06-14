import { Request, Response } from "express";
import {
  createOrder,
  findAllOrders,
  findAllOrdersByCountry,
  findUniqueOrder,
  updateOrder,
} from "../data/orders_data";
import {
  compareSalesByDates,
  compareSalesByMonth,
  lastNOrders,
  ordersByTotals,
} from "../services/orders_stats";

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

export async function getSalesStatsByDates(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: compareSalesByDates(
        await findAllOrders(),
        new Date(req.body.startDate),
        new Date(req.body.endDate)
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getLatestSales(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: lastNOrders(await findAllOrders(), Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getSalesByMonth(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: compareSalesByMonth(
        await findAllOrders(),
        Number(req.params.month)
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getSalesByTotals(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: ordersByTotals(await findAllOrders()),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getOrdersByCountry(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllOrdersByCountry(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
