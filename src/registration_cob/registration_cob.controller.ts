import { Controller, Get, Post } from '@nestjs/common';
import { Patch, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { Payload } from '@nestjs/microservices';
import { RegistrationCobService } from './registration_cob.service';
import { registrationCobDocument } from 'src/interfaces/mongoose.gen';
import { IFilterParams } from 'src/interfaces/filter.type';

@Controller('registrationCob')
export class RegistrationCobController {
  constructor(
    private readonly registrationCobService: RegistrationCobService,
  ) {}

  @Post()
  async createregistrationCob(
    @Res() res,
    @Payload() registrationCob: registrationCobDocument,
  ) {
    const newregistrationCob =
      await this.registrationCobService.createregistrationCob(registrationCob);
    if (newregistrationCob) {
      return res.status(HttpStatus.CREATED).json({ newregistrationCob });
    } else {
      return res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const allRegCob = await this.registrationCobService.findAll(filter);
    return res.status(HttpStatus.ACCEPTED).json({ allRegCob });
  }

  @Get('search/:id')
  async findOne(@Res() res, @Payload() id: string) {
    const searchRegCob = await this.registrationCobService.findOne(id);
    if (searchRegCob) {
      return res.status(HttpStatus.OK).json(searchRegCob);
    } else {
      return res.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('update/:id')
  async update(
    @Res() res,
    @Payload() registrationCob: registrationCobDocument,
  ) {
    const RegistrationCobUpdate = await this.registrationCobService.update(
      registrationCob.id,
      registrationCob,
    );
    if (!RegistrationCobUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    return res.status(HttpStatus.OK).json({ RegistrationCobUpdate });
  }
}
