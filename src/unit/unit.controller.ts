import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { error } from 'console';
import { unitDocument } from 'src/interfaces/mongoose.gen';
import { UnitService } from './unit.service';

@Controller('/unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async createUnit(@Res() res, @Body() unit: unitDocument) {
    const newUnit = await this.unitService.createUnit(unit);
    if (newUnit) {
      return res.status(HttpStatus.CREATED).json({ newUnit });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error,
      });
    }
  }

  @MessagePattern('findAllUnit')
  findAll() {
    return this.unitService.findAll();
  }

  @MessagePattern('findOneUnit')
  findOne(@Payload() id: number) {
    return this.unitService.findOne(id);
  }

  @MessagePattern('updateUnit')
  update(@Payload() updateUnitDto) {
    return this.unitService.update(updateUnitDto.id);
  }

  @MessagePattern('removeUnit')
  remove(@Payload() id: number) {
    return this.unitService.remove(id);
  }
}
