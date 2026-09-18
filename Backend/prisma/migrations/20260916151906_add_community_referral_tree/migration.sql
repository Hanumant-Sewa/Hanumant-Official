-- AlterTable
ALTER TABLE "CommunityMember" ADD COLUMN     "referredById" INTEGER;

-- CreateIndex
CREATE INDEX "CommunityMember_referredById_idx" ON "CommunityMember"("referredById");

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "CommunityMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
