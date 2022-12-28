/*
  Warnings:

  - You are about to drop the column `locationMunicipalitySlug` on the `WorkItem` table. All the data in the column will be lost.
  - You are about to drop the column `permitRequirementSlug` on the `WorkItem` table. All the data in the column will be lost.
  - You are about to drop the `PermitRequirement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JobRequestToWorkItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `WorkItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `WorkItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkItem" DROP CONSTRAINT "WorkItem_locationMunicipalitySlug_fkey";

-- DropForeignKey
ALTER TABLE "WorkItem" DROP CONSTRAINT "WorkItem_permitRequirementSlug_fkey";

-- DropForeignKey
ALTER TABLE "_JobRequestToWorkItem" DROP CONSTRAINT "_JobRequestToWorkItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_JobRequestToWorkItem" DROP CONSTRAINT "_JobRequestToWorkItem_B_fkey";

-- DropIndex
DROP INDEX "WorkItem_displayText_workType_workArea_locationMunicipality_key";

-- AlterTable
ALTER TABLE "WorkItem" DROP COLUMN "locationMunicipalitySlug",
DROP COLUMN "permitRequirementSlug",
ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "PermitRequirement";

-- DropTable
DROP TABLE "_JobRequestToWorkItem";

-- CreateTable
CREATE TABLE "PermitProcess" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "requiresPlans" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermitProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermitRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationMunicipalitySlug" TEXT NOT NULL,
    "permitProcessSlug" TEXT NOT NULL,
    "workItemSlug" TEXT NOT NULL,

    CONSTRAINT "PermitRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobRequestToPermitRule" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PermitProcess_slug_key" ON "PermitProcess"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PermitRule_locationMunicipalitySlug_permitProcessSlug_workI_key" ON "PermitRule"("locationMunicipalitySlug", "permitProcessSlug", "workItemSlug");

-- CreateIndex
CREATE UNIQUE INDEX "_JobRequestToPermitRule_AB_unique" ON "_JobRequestToPermitRule"("A", "B");

-- CreateIndex
CREATE INDEX "_JobRequestToPermitRule_B_index" ON "_JobRequestToPermitRule"("B");

-- CreateIndex
CREATE UNIQUE INDEX "WorkItem_slug_key" ON "WorkItem"("slug");

-- AddForeignKey
ALTER TABLE "PermitRule" ADD CONSTRAINT "PermitRule_locationMunicipalitySlug_fkey" FOREIGN KEY ("locationMunicipalitySlug") REFERENCES "LocationMunicipality"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermitRule" ADD CONSTRAINT "PermitRule_permitProcessSlug_fkey" FOREIGN KEY ("permitProcessSlug") REFERENCES "PermitProcess"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermitRule" ADD CONSTRAINT "PermitRule_workItemSlug_fkey" FOREIGN KEY ("workItemSlug") REFERENCES "WorkItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobRequestToPermitRule" ADD CONSTRAINT "_JobRequestToPermitRule_A_fkey" FOREIGN KEY ("A") REFERENCES "JobRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobRequestToPermitRule" ADD CONSTRAINT "_JobRequestToPermitRule_B_fkey" FOREIGN KEY ("B") REFERENCES "PermitRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
