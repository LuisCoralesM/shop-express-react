import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import { join } from "path";

const prisma = new PrismaClient();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, "/../../client/build")));

app.get("/api/health", async (req: Request, res: Response) => {
  return res.send("ok");
});

app.get("/api/status", async (req: Request, res: Response) => {
  try {
    const count = await prisma.user.count();
    return res.json({ count });
  } catch (error) {
    return res.json({ message: error });
  }
});

app.use("/api/", router);

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "/../../client/build/index.html"));
});

app.use((req: Request, res: Response) => {
  return res.sendStatus(404);
});

app.listen(port, () => {
  console.log("The API is running on http://localhost:" + port);
});
