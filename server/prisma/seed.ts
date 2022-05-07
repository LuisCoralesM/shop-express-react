import { PrismaClient, Role } from "@prisma/client";
import argon2 from "argon2";

async function hashPasswords(): Promise<string[]> {
  return [
    await argon2.hash("11111111", {
      type: argon2.argon2id,
    }),
    await argon2.hash("22222222", {
      type: argon2.argon2id,
    }),
    await argon2.hash("33333333", {
      type: argon2.argon2id,
    }),
  ];
}

const prisma = new PrismaClient();

async function main() {
  const pass = await hashPasswords();

  await prisma.user.createMany({
    data: [
      {
        first_name: "A",
        last_name: "Corales",
        email: "1@1.com",
        password: pass[0],
        role: Role.ADMIN,
      },
      {
        first_name: "B",
        last_name: "Ramirez",
        email: "2@2.com",
        password: pass[1],
      },
      {
        first_name: "E",
        last_name: "gonzalez",
        email: "3@3.com",
        password: pass[2],
      },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => prisma.$disconnect);
