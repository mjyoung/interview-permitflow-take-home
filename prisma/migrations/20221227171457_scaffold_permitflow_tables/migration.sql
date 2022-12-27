-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL');

-- CreateEnum
CREATE TYPE "WorkArea" AS ENUM ('EXTERIOR', 'INTERIOR');

-- CreateTable
CREATE TABLE "JobRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationState" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LocationState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationMunicipality" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationStateSlug" TEXT NOT NULL,

    CONSTRAINT "LocationMunicipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermitRequirement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "requiresPlans" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PermitRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkItem" (
    "id" TEXT NOT NULL,
    "displayText" TEXT NOT NULL,
    "workType" "WorkType" NOT NULL,
    "workArea" "WorkArea" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationMunicipalitySlug" TEXT NOT NULL,
    "permitRequirementSlug" TEXT NOT NULL,

    CONSTRAINT "WorkItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LocationState_slug_key" ON "LocationState"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LocationMunicipality_slug_key" ON "LocationMunicipality"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PermitRequirement_slug_key" ON "PermitRequirement"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WorkItem_displayText_workType_workArea_locationMunicipality_key" ON "WorkItem"("displayText", "workType", "workArea", "locationMunicipalitySlug", "permitRequirementSlug");

-- AddForeignKey
ALTER TABLE "LocationMunicipality" ADD CONSTRAINT "LocationMunicipality_locationStateSlug_fkey" FOREIGN KEY ("locationStateSlug") REFERENCES "LocationState"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_locationMunicipalitySlug_fkey" FOREIGN KEY ("locationMunicipalitySlug") REFERENCES "LocationMunicipality"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_permitRequirementSlug_fkey" FOREIGN KEY ("permitRequirementSlug") REFERENCES "PermitRequirement"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
