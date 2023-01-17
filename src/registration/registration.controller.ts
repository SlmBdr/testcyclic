import { Payload } from '@nestjs/microservices';
import { RegistrationService } from './registration.service';
import { registrationDocument } from 'src/interfaces/mongoose.gen';
import { Controller, Get, Post } from '@nestjs/common';
import { Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { IFilterParams } from 'src/interfaces/filter.type';

@Controller('/regis')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async create(@Res() res, @Payload() registration: registrationDocument) {
    const newRegistration = await this.registrationService.createRegistration(
      registration,
    );
    if (newRegistration) {
      return res.status(HttpStatus.CREATED).json({ newRegistration });
    } else {
      return res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const resultAll = await this.registrationService.findAll(filter);
    return res.status(HttpStatus.ACCEPTED).json({ resultAll });
  }

  @Get('search/:id')
  async findOne(@Payload() id: string) {
    return this.registrationService.findOne(id);
  }

  @Patch('update')
  async update(@Res() res, @Payload() registration: registrationDocument) {
    const RegistrationUpdate = await this.registrationService.update(
      registration.id,
      registration,
    );
    if (!RegistrationUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    return res.status(HttpStatus.OK).json({ RegistrationUpdate });
  }
}
