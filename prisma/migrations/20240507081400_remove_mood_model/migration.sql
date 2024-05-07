/*
  Warnings:

  - You are about to drop the `Emotion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mood` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Emotion" DROP CONSTRAINT "Emotion_userId_fkey";

-- AlterTable
ALTER TABLE "Journal" ADD COLUMN     "mood" "Mood" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Emotion";
