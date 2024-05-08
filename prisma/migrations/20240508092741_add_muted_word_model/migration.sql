-- CreateTable
CREATE TABLE "MutedWord" (
    "id" TEXT NOT NULL,
    "word" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MutedWord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MutedWord" ADD CONSTRAINT "MutedWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
