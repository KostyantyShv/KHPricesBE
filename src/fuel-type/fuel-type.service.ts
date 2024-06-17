import { Injectable } from '@nestjs/common';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FuelTypeService {
  constructor(private prisma: PrismaService) {}
  create(createFuelTypeDto: CreateFuelTypeDto) {
    return `This action adds a new fuelType in ${createFuelTypeDto}`;
  }

  findAll() {
    try {
      return this.prisma.fuelType.findMany();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelType`;
  }

  update(id: number, updateFuelTypeDto: UpdateFuelTypeDto) {
    return `This action updates a #${id} ${updateFuelTypeDto} fuelType`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelType`;
  }
}
