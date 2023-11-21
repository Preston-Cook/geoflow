-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VistInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lat" REAL NOT NULL,
    "lng" REAL NOT NULL,
    "ip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "domainId" INTEGER NOT NULL,
    CONSTRAINT "VistInfo_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VistInfo" ("city", "country", "domainId", "id", "ip", "lat", "lng", "org", "postal", "region", "timezone") SELECT "city", "country", "domainId", "id", "ip", "lat", "lng", "org", "postal", "region", "timezone" FROM "VistInfo";
DROP TABLE "VistInfo";
ALTER TABLE "new_VistInfo" RENAME TO "VistInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
