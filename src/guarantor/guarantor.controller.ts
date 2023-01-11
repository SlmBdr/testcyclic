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

  @Get()
  async findAll(@Res() res) {
    const allGuarantor = await this.guarantorService.findAllGuarantor();
    return res.status(HttpStatus.ACCEPTED).json({ allGuarantor });
  }

  @Get('/detail/:id')
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
  update(@Payload() guarantor: guarantorDocument) {
    return this.guarantorService.update(guarantor.id, guarantor);
  }
}
