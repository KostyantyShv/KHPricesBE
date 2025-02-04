import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { FuelTypeService } from './fuel-type.service';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';

@Controller('fuel-type')
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Post()
  create(@Body() createFuelTypeDto: CreateFuelTypeDto) {
    return this.fuelTypeService.create(createFuelTypeDto);
  }

  @Get('/get-all')
  findAll() {
    try {
      return this.fuelTypeService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuelTypeDto: UpdateFuelTypeDto,
  ) {
    return this.fuelTypeService.update(+id, updateFuelTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelTypeService.remove(+id);
  }
}
