/*
  Warnings:

  - Added the required column `lng` to the `LatLng` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LatLng" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL,
    "domainId" INTEGER NOT NULL,
    CONSTRAINT "LatLng_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LatLng" ("domainId", "id", "lat") SELECT "domainId", "id", "lat" FROM "LatLng";
DROP TABLE "LatLng";
ALTER TABLE "new_LatLng" RENAME TO "LatLng";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
