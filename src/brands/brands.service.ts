import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}
  create(createBrandDto: CreateBrandDto) {
    console.log(createBrandDto);
    return 'This action adds a new brand';
  }
  async createMany(stationBrands: any) {
    try {
      const res = await this.prisma.brand.createMany({ data: stationBrands });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const brandsData = await this.prisma.brand.findMany();
      return brandsData;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    console.log(updateBrandDto);
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
