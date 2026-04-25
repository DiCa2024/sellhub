-- CreateTable
CREATE TABLE "WholesaleSite" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "dropshipping" TEXT NOT NULL,
    "businessRequired" TEXT NOT NULL,
    "usageFee" TEXT NOT NULL,
    "imageProvided" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WholesaleSite_pkey" PRIMARY KEY ("id")
);
