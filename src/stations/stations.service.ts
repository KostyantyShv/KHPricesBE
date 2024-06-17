import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { LocationIqService } from 'src/location-iq/location-iq.service';
import { searchStationsDTO } from './dto/search-stations.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationsService {
  constructor(
    private locationIQService: LocationIqService,
    private prisma: PrismaService,
  ) {}
  create(createStationDto: CreateStationDto) {
    console.log(createStationDto);
    return 'This action adds a new station';
  }
  async createMany(stations: any) {
    try {
      const res = await this.prisma.station.createMany({ data: stations });

      console.log(stations);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findAll(searchObject: searchStationsDTO) {
    try {
      console.log(searchObject);
      const location = await this.locationIQService.getCoordsFromPlaceName(
        searchObject.placeName,
      );
      return location;
    } catch (error) {
      throw error;
    }
  }

  calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const R = 6371e3; // Радіус Землі в метрах
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Відстань в метрах
    return distance / 1000;
  }

  async findByFilters(searchObject: searchStationsDTO) {
    try {
      // Get coordinates from LocationIQ
      const location = await this.locationIQService.getCoordsFromPlaceName(
        searchObject.placeName,
      );

      // Parse fuelTypeIds, facilityIds, and brandIds from the search object if they exist
      const fuelTypes = searchObject.fuelTypeIds
        ? searchObject.fuelTypeIds
            .split(',')
            .map((fuelType) => parseInt(fuelType))
        : null;

      const facilityIds = searchObject.facilityIds
        ? searchObject.facilityIds
            .split(',')
            .map((facilityId) => parseInt(facilityId))
        : null;

      const brandIds = searchObject.brandIds
        ? searchObject.brandIds.split(',').map((brandId) => parseInt(brandId))
        : null;

      const maxDistanceToStation = searchObject.maxDistance;

      // Construct the where clause conditionally based on the provided filters
      const whereClause: any = {};

      if (facilityIds) {
        whereClause.facilities = {
          some: {
            facilityId: {
              in: facilityIds,
            },
          },
        };
      }

      if (brandIds) {
        whereClause.brandId = {
          in: brandIds,
        };
      }

      // Find stations with their details, including only relevant prices and facilities
      const stationsWithDetails = await this.prisma.station.findMany({
        where: whereClause,
        select: {
          id: true,
          brandId: true,
          name: true,
          description: true,
          region: true,
          town: true,
          address: true,
          postcode: true,
          lat: true,
          lng: true,
          createdAt: true,
          prices: {
            where: fuelTypes
              ? {
                  fuelTypeId: {
                    in: fuelTypes,
                  },
                }
              : {},
            include: {
              fuelType: true,
            },
            orderBy: {
              fuelTypeId: 'asc', // Sort prices by fuelTypeId in ascending order
            },
          },
          facilities: {
            where: facilityIds
              ? {
                  facilityId: {
                    in: facilityIds,
                  },
                }
              : {},
            include: {
              facility: true,
            },
            orderBy: {
              facilityId: 'asc', // Sort facilities by facilityId in ascending order
            },
          },
          brand: true,
        },
      });

      // Calculate distance and filter stations
      const filteredStations = stationsWithDetails
        .map((station) => {
          const distance = this.calculateDistance(
            location.lat,
            location.lng,
            station.lat,
            station.lng,
          );
          return {
            ...station,
            distanceFromSearchCoords: parseFloat(distance.toFixed(2)),
          };
        })
        .filter(
          (station) =>
            station.distanceFromSearchCoords <= maxDistanceToStation &&
            (!fuelTypes || station.prices.length > 0) &&
            (!facilityIds || station.facilities.length > 0),
        );

      // Create clusters dynamically
      const clusters: { clusterName: string; stations: any[] }[] = [];
      const clusteredStationIds = new Set<number>();

      // Best Choice Cluster
      const bestChoiceStation = filteredStations.sort((a, b) => {
        // Rank based on multiple criteria: distance, price (first price), and number of facilities
        const priceA = a.prices.length > 0 ? a.prices[0].price : Infinity;
        const priceB = b.prices.length > 0 ? b.prices[0].price : Infinity;
        const facilityCountDiff = b.facilities.length - a.facilities.length;
        if (facilityCountDiff !== 0) return facilityCountDiff; // Prefer more facilities
        const priceDiff = priceA - priceB;
        if (priceDiff !== 0) return priceDiff; // Prefer lower price
        return a.distanceFromSearchCoords - b.distanceFromSearchCoords; // Prefer closer distance
      })[0];

      if (bestChoiceStation) {
        clusters.push({
          clusterName: 'Відповідає запиту',
          stations: [bestChoiceStation],
        });
        clusteredStationIds.add(bestChoiceStation.id);
      }

      // Best Price Clusters
      if (fuelTypes && fuelTypes.length > 0) {
        const clusterName =
          fuelTypes.length === 1
            ? 'Відповідає запиту за типом пального'
            : 'Відповідає запиту  за типами пального';

        // Find unique stations with the most fuel types
        const stationFuelTypeCounts = filteredStations.map((station) => ({
          ...station,
          fuelTypeCount: new Set(
            station.prices.map((price) => price.fuelTypeId),
          ).size,
        }));

        const bestPriceStations = stationFuelTypeCounts
          .sort((a, b) => b.fuelTypeCount - a.fuelTypeCount)
          .slice(0, 3);

        bestPriceStations.forEach((station) =>
          clusteredStationIds.add(station.id),
        );
        clusters.push({
          clusterName: clusterName,
          stations: bestPriceStations,
        });
      }

      // Best Match by Facilities Cluster
      if (facilityIds && facilityIds.length > 1) {
        const bestMatchByFacilitiesCluster = filteredStations
          .sort((a, b) => b.facilities.length - a.facilities.length)
          .slice(0, 3); // Top 3 stations by facilities
        bestMatchByFacilitiesCluster.forEach((station) =>
          clusteredStationIds.add(station.id),
        );
        clusters.push({
          clusterName: 'Найбільше послуг',
          stations: bestMatchByFacilitiesCluster,
        });
      }

      // Closest Distance Cluster
      const closestDistanceCluster = filteredStations
        .sort((a, b) => a.distanceFromSearchCoords - b.distanceFromSearchCoords)
        .slice(0, 3); // Top 3 closest stations
      closestDistanceCluster.forEach((station) =>
        clusteredStationIds.add(station.id),
      );
      clusters.push({
        clusterName: 'Найближчі',
        stations: closestDistanceCluster,
      });

      // Stations that don't match any cluster
      const stationsNotInClusters = filteredStations.filter(
        (station) => !clusteredStationIds.has(station.id),
      );

      return {
        stations: filteredStations,
        clusters: clusters,
        location: location,
        stationsNotInClusters: stationsNotInClusters,
      };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    try {
    } catch (error) {
      throw error;
    }
    return `This action returns a #${id} station`;
  }

  update(id: number, updateStationDto: UpdateStationDto) {
    console.log(updateStationDto);
    return `This action updates a #${id} station`;
  }

  remove(id: number) {
    return `This action removes a #${id} station`;
  }
}
