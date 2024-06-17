import { Injectable } from '@nestjs/common';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FacilityService {
  constructor(private prisma: PrismaService) {}
  create(createFacilityDto: any) {
    console.log(createFacilityDto);
    // return 'This action adds a new facility';
  }
  async createMany(stationFacility: any) {
    try {
      console.log(stationFacility);
      const res = await this.prisma.stationFacilities.createMany({
        data: stationFacility,
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.facility.findMany({
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  update(id: number, updateFacilityDto: UpdateFacilityDto) {
    console.log(updateFacilityDto);
    return `This action updates a #${id} facility`;
  }

  remove(id: number) {
    return `This action removes a #${id} facility`;
  }
}
