/*
  Warnings:

  - You are about to drop the `_StationFacilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_StationFacilities" DROP CONSTRAINT "_StationFacilities_A_fkey";

-- DropForeignKey
ALTER TABLE "_StationFacilities" DROP CONSTRAINT "_StationFacilities_B_fkey";

-- DropTable
DROP TABLE "_StationFacilities";

-- CreateTable
CREATE TABLE "StationFacilities" (
    "id" SERIAL NOT NULL,
    "stationId" INTEGER NOT NULL,
    "facilityId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StationFacilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StationFacilities" ADD CONSTRAINT "StationFacilities_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationFacilities" ADD CONSTRAINT "StationFacilities_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
