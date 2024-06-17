import { Injectable } from '@nestjs/common';
import { CreateStationPriceDto } from './dto/create-station-price.dto';
import { UpdateStationPriceDto } from './dto/update-station-price.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationPricesService {
  constructor(private prisma: PrismaService) {}
  create(createStationPriceDto: CreateStationPriceDto) {
    console.log(createStationPriceDto);
    return 'This action adds a new stationPrice';
  }
  async createMany(createStationPriceDto: any) {
    try {
      const res = await this.prisma.stationPrice.createMany({
        data: createStationPriceDto,
      });
      console.log(createStationPriceDto);
      return res;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all stationPrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stationPrice`;
  }

  update(id: number, updateStationPriceDto: UpdateStationPriceDto) {
    console.log(id, updateStationPriceDto);
    return `This action updates a #${id} stationPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} stationPrice`;
  }
}
