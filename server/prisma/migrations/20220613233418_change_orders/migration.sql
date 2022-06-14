/*
  Warnings:

  - You are about to drop the column `order_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_order_id_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "products" INTEGER[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "order_id";
