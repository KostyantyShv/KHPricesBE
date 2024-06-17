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
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilityService.create(createFacilityDto);
  }
  @Post('/create-many')
  async createMany(@Body() createFacilityDto: any) {
    try {
      return await this.facilityService.createMany(createFacilityDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      return await this.facilityService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ) {
    return this.facilityService.update(+id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityService.remove(+id);
  }
}
