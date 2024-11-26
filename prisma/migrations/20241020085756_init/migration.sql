-- CreateTable
CREATE TABLE "Barista" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Barista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "baristaId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Barista_email_key" ON "Barista"("email");

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_baristaId_fkey" FOREIGN KEY ("baristaId") REFERENCES "Barista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
