import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/status", async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count();
    return res.json({ count });
  } catch (error) {
    return res.json({ message: error });
  }
});

app.use("/", router);

app.use((req: Request, res: Response) => {
  return res.sendStatus(404);
});

app.listen(port, () => {
  console.log("The API is running on http://localhost:" + port);
});
