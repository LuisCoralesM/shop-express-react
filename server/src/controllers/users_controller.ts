import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/** To GET own user route */
export async function getOwnUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.body.user.id),
      },
    });

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users route */
export async function getAllUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany();

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users by id route */
export async function getOneUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE one user route */
export async function deleteOneUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE users route */
export async function deleteOwnUser(req: Request, res: Response) {
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.body.user.id),
      },
      data: {
        deleted_at: new Date(),
      },
    });

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
