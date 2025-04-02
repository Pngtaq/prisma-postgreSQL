/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Forms" (
    "formId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("formId")
);

-- CreateTable
CREATE TABLE "Fields" (
    "fieldId" SERIAL NOT NULL,
    "formId" INTEGER NOT NULL,
    "indicatorNo" INTEGER NOT NULL,
    "indicatorName" TEXT NOT NULL,
    "method" TEXT[],
    "evidence" TEXT[],
    "movs" TEXT[],
    "rating" INTEGER NOT NULL,
    "remarks" TEXT,

    CONSTRAINT "Fields_pkey" PRIMARY KEY ("fieldId")
);

-- AddForeignKey
ALTER TABLE "Fields" ADD CONSTRAINT "Fields_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Forms"("formId") ON DELETE CASCADE ON UPDATE CASCADE;
