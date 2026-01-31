-- CreateTable
CREATE TABLE "monthly_goal" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "limit" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "monthly_goal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monthly_goal_userId_month_key" ON "monthly_goal"("userId", "month");

-- AddForeignKey
ALTER TABLE "monthly_goal" ADD CONSTRAINT "monthly_goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
