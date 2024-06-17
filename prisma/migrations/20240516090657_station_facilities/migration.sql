-- CreateTable
CREATE TABLE "StationFacilities" (
    "id" SERIAL NOT NULL,
    "stationID" INTEGER NOT NULL,
    "facilityID" INTEGER NOT NULL,

    CONSTRAINT "StationFacilities_pkey" PRIMARY KEY ("id")
);
