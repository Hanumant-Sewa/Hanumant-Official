/*
  Warnings:

  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(12,2)`.

*/
-- DropIndex
DROP INDEX "Notification_createdAt_idx";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "VolunteerProfile" ADD COLUMN     "ageGroup" TEXT;

-- CreateIndex
CREATE INDEX "CommunityInvitation_inviterId_idx" ON "CommunityInvitation"("inviterId");

-- CreateIndex
CREATE INDEX "CommunityInvitation_communityId_idx" ON "CommunityInvitation"("communityId");

-- CreateIndex
CREATE INDEX "CommunityInvitation_status_idx" ON "CommunityInvitation"("status");

-- CreateIndex
CREATE INDEX "Expense_campaignId_idx" ON "Expense"("campaignId");

-- CreateIndex
CREATE INDEX "Expense_expenseDate_idx" ON "Expense"("expenseDate");

-- CreateIndex
CREATE INDEX "Expense_category_idx" ON "Expense"("category");
