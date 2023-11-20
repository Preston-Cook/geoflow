/*
  Warnings:

  - The primary key for the `Domain` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `Domain` table. All the data in the column will be lost.
  - Added the required column `id` to the `Domain` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LatLng" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" DECIMAL NOT NULL,
    "lng" DECIMAL NOT NULL,
    "domainId" INTEGER NOT NULL,
    CONSTRAINT "LatLng_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LatLng" ("domainId", "id", "lat", "lng") SELECT "domainId", "id", "lat", "lng" FROM "LatLng";
DROP TABLE "LatLng";
ALTER TABLE "new_LatLng" RENAME TO "LatLng";
CREATE TABLE "new_Domain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL
);
INSERT INTO "new_Domain" ("domain") SELECT "domain" FROM "Domain";
DROP TABLE "Domain";
ALTER TABLE "new_Domain" RENAME TO "Domain";
CREATE UNIQUE INDEX "Domain_domain_key" ON "Domain"("domain");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
