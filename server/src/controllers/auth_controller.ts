import argon2 from "argon2";
import { PrismaClient, User, Role } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import { Request, Response } from "express";

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
      })
      .status(201)
      .json({
        email: req.body.user.email,
        isLogged: true,
        isAdmin: req.body.user.role,
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
        role: req.body.email === "1@1.com" ? Role.ADMIN : Role.USER,
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

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$Y$%&/()={+}[]";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function checkAuth0(req: Request, res: Response) {
  try {
    const authUser = req.oidc.user;

    if (authUser) {
      const user = await prisma.user.findUnique({
        where: {
          email: authUser.email,
        },
      });

      if (user === null) {
        const newUser = await prisma.user.create({
          data: {
            first_name: authUser.given_name || "",
            last_name: authUser.family_name || "",
            email: authUser.email,
            password: makeid(30),
            role: authUser.email === "1@1.com" ? Role.ADMIN : Role.USER,
          },
        });
        req.body.isAdmin = newUser.role;
        req.headers.authorization = generateToken(newUser, "secret");
      } else {
        req.body.isAdmin = user.role;
        req.headers.authorization = generateToken(user, "secret");
      }

      return res
        .cookie("token", req.headers.authorization, {
          httpOnly: true,
        })
        .status(201)
        .json({
          isAuthenticated: true,
          isAdmin: req.body.isAdmin,
        });
    }
    return res.status(200).json({ isAuthenticated: false, isAdmin: false });
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

/** To POST auth route */
export async function logout(req: Request, res: Response) {
  try {
    return res
      .clearCookie("token")
      .status(201)
      .json({ msg: "Logged out", isLogged: false });
  } catch (e) {
    console.log(e);
    return res.sendStatus(401);
  }
}
