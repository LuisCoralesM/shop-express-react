import { Request, Response } from "express";
import {
  createProduct,
  findAllProducts,
  findUniqueProduct,
  updateProduct,
  deleteProducts,
} from "../data/products_data";

/** To GET products route */
export async function getProducts(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllProducts(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST product route */
export async function postProduct(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await createProduct(
        req.body.title,
        req.body.description,
        Number(req.body.unit_price),
        req.body.image ?? "",
        Number(req.body.sale)
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET one product route */
export async function getOneProduct(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUniqueProduct(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT product route */
export async function putProduct(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await updateProduct(
        Number(req.params.id),
        req.body.title,
        req.body.description,
        Number(req.body.unit_price),
        req.body.image,
        Number(req.body.sale)
      ),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To PUT product route */
export async function deleteProduct(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await deleteProducts(Number(req.body.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
