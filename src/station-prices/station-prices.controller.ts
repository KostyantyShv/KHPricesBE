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
import { StationPricesService } from './station-prices.service';
import { CreateStationPriceDto } from './dto/create-station-price.dto';
import { UpdateStationPriceDto } from './dto/update-station-price.dto';

@Controller('station-prices')
export class StationPricesController {
  constructor(private readonly stationPricesService: StationPricesService) {}

  @Post()
  create(@Body() createStationPriceDto: CreateStationPriceDto) {
    return this.stationPricesService.create(createStationPriceDto);
  }
  @Post('/create-many')
  async createMany(@Body() createStationPriceDto: any) {
    try {
      return await this.stationPricesService.createMany(createStationPriceDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  @Get()
  findAll() {
    return this.stationPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationPricesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStationPriceDto: UpdateStationPriceDto,
  ) {
    return this.stationPricesService.update(+id, updateStationPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationPricesService.remove(+id);
  }
}
