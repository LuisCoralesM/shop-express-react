import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export async function findUserById(id: number) {
  try {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        created_at: true,
        deleted_at: true,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    return undefined;
  }
}

export async function deleteUser(id: number) {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        deleted_at: new Date(),
      },
    });
  } catch (error) {
    return undefined;
  }
}
export async function findAllUsers() {
  try {
    return await prisma.user.findMany();
  } catch (e) {
    return [];
  }
}

export async function updateUserData(id: number, role: Role) {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
  } catch (error) {
    return undefined;
  }
}
