import argon2 from "argon2";
import { PrismaClient, User } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";
import { ROLE } from "../roles/roles";

const prisma = new PrismaClient();

function generateToken(
  payload: User,
  privateKey: string,
  signOptions?: SignOptions
) {
  return jwt.sign(payload, privateKey, signOptions);
}

/** To POST login route */
export async function login(req: Request, res: Response) {
  try {
    if (!req.body.userExist) throw new Error();

    if (await argon2.verify(req.body.user.password, req.body.password))
      req.headers.authorization = generateToken(req.body.user, "secret");
    else throw new Error();

    return res
      .cookie("token", req.headers.authorization, {
        httpOnly: true,
        secure: true,
      })
      .status(201)
      .json({
        email: req.body.user.email,
        token: req.headers.authorization,
      });
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
}

/** To POST signup route */
export async function signup(req: Request, res: Response) {
  try {
    if (req.headers.userExist) throw new Error();

    const hash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });

    const user = await prisma.user.create({
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        role: ROLE.USER,
      },
    });

    return res.status(201).json({
      user,
    });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST auth route */
export async function logout(req: Request, res: Response) {
  try {
    return res.clearCookie("token").status(201).json({ msg: "Logged out" });
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
}
