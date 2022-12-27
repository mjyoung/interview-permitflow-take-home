-- CreateTable
CREATE TABLE "_JobRequestToWorkItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobRequestToWorkItem_AB_unique" ON "_JobRequestToWorkItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobRequestToWorkItem_B_index" ON "_JobRequestToWorkItem"("B");

-- AddForeignKey
ALTER TABLE "_JobRequestToWorkItem" ADD CONSTRAINT "_JobRequestToWorkItem_A_fkey" FOREIGN KEY ("A") REFERENCES "JobRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobRequestToWorkItem" ADD CONSTRAINT "_JobRequestToWorkItem_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
