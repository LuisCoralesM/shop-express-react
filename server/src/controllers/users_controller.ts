import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  deleteUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
  updateUserData,
} from "../data/users_data";

const prisma = new PrismaClient();

/** To GET own user route */
export async function getOwnUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUserById(Number(req.body.user.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users route */
export async function getAllUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findAllUsers(),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To GET users by id route */
export async function getOneUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await findUserByEmail(req.params.email),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE one user route */
export async function deleteOneUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await deleteUser(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await updateUserData(Number(req.params.id), req.body.role),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To DELETE users route */
export async function deleteOwnUser(req: Request, res: Response) {
  try {
    return res.status(200).json({
      data: await deleteUser(Number(req.body.user.id)),
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
