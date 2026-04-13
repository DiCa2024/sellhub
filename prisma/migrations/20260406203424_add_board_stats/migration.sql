-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContactPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ContactPost" ("author", "content", "createdAt", "id", "title") SELECT "author", "content", "createdAt", "id", "title" FROM "ContactPost";
DROP TABLE "ContactPost";
ALTER TABLE "new_ContactPost" RENAME TO "ContactPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
