-- CreateTable
CREATE TABLE "Domain" (
    "Id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LatLng" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lat" DECIMAL NOT NULL,
    "domainId" INTEGER NOT NULL,
    CONSTRAINT "LatLng_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_domain_key" ON "Domain"("domain");
