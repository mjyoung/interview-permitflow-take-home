-- DropForeignKey
ALTER TABLE "PermitRule" DROP CONSTRAINT "PermitRule_workItemSlug_fkey";

-- AddForeignKey
ALTER TABLE "PermitRule" ADD CONSTRAINT "PermitRule_workItemSlug_fkey" FOREIGN KEY ("workItemSlug") REFERENCES "WorkItem"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
