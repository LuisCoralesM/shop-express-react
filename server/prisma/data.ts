import { Role } from "@prisma/client";

export const users = [
  {
    first_name: "A",
    last_name: "Corales",
    email: "1@email.com",
    password: "11111111",
    role: Role.ADMIN,
  },
  {
    first_name: "B",
    last_name: "Ramirez",
    email: "2@email.com",
    password: "33333333",
    role: Role.USER,
  },
  {
    first_name: "C",
    last_name: "gonzalez",
    email: "3@email.com",
    password: "33333333",
    role: Role.USER,
  },
];
