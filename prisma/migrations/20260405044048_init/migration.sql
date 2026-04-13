-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "country" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "oneLiner" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT,
    "logoUrl" TEXT,
    "thumbnailUrl" TEXT,
    "introTitle" TEXT,
    "introDescription" TEXT,
    "competitivenessTitle" TEXT,
    "competitivenessBody" TEXT,
    "targetCustomer" TEXT,
    "operationSupport" TEXT,
    "startupProcess" TEXT,
    "recommendedLocation" TEXT,
    "cautionNote" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "headquartersName" TEXT,
    "monthlyRevenue" TEXT,
    "storeCount" INTEGER,
    "foundingYear" INTEGER,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "storesSeoul" INTEGER,
    "storesGyeonggi" INTEGER,
    "storesIncheon" INTEGER,
    "storesBusan" INTEGER,
    "storesGwangju" INTEGER,
    "storesDaegu" INTEGER,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "Brand_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Brand" ("budget", "category", "cautionNote", "competitivenessBody", "competitivenessTitle", "contactEmail", "contactPhone", "country", "createdAt", "description", "foundingYear", "headquartersName", "id", "imageUrl", "introDescription", "introTitle", "isPublished", "logoUrl", "monthlyRevenue", "name", "oneLiner", "operationSupport", "ownerId", "recommendedLocation", "slug", "startupProcess", "status", "storeCount", "summary", "tags", "targetCustomer", "thumbnailUrl", "views") SELECT "budget", "category", "cautionNote", "competitivenessBody", "competitivenessTitle", "contactEmail", "contactPhone", "country", "createdAt", "description", "foundingYear", "headquartersName", "id", "imageUrl", "introDescription", "introTitle", "isPublished", "logoUrl", "monthlyRevenue", "name", "oneLiner", "operationSupport", "ownerId", "recommendedLocation", "slug", "startupProcess", "status", "storeCount", "summary", "tags", "targetCustomer", "thumbnailUrl", "views" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
