import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IFilterParams } from 'src/interfaces/filter.type';
import { guarantorDocument } from 'src/interfaces/mongoose.gen';
import { GuarantorService } from './guarantor.service';

@Controller('guarantor')
export class GuarantorController {
  constructor(private readonly guarantorService: GuarantorService) {}

  @Post()
  async create(@Res() res, @Payload() guarantor: guarantorDocument) {
    const newGuarantor = await this.guarantorService.createGuarantor(guarantor);
    if (!newGuarantor) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newGuarantor });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const allGuarantor = await this.guarantorService.findAllGuarantor(filter);
    return res.status(HttpStatus.ACCEPTED).json({ allGuarantor });
  }

  @Get('search/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const detailGuarantor = await this.guarantorService.findOne(id);
    if (!detailGuarantor) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.OK).JSON({ detailGuarantor });
    }
  }

  @Patch()
  async update(@Res() res, @Payload() guarantor: guarantorDocument) {
    const guarantorUpdate = await this.guarantorService.update(
      guarantor.id,
      guarantor,
    );
    if (!guarantorUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    return res.status(HttpStatus.OK).json({ guarantor });
  }
}
