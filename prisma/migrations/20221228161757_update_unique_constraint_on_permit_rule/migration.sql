/*
  Warnings:

  - A unique constraint covering the columns `[locationMunicipalitySlug,workItemSlug]` on the table `PermitRule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PermitRule_locationMunicipalitySlug_permitProcessSlug_workI_key";

-- CreateIndex
CREATE UNIQUE INDEX "PermitRule_locationMunicipalitySlug_workItemSlug_key" ON "PermitRule"("locationMunicipalitySlug", "workItemSlug");
