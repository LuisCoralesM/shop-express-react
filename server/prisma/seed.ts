import { PrismaClient } from "@prisma/client";
import { users } from "./data";

const prisma = new PrismaClient();

async function main() {
  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => prisma.$disconnect);
