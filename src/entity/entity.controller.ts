import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { entityDocument } from 'src/interfaces/mongoose.gen';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Res() res, @Payload() entity: entityDocument) {
    const newEntity = await this.entityService.createEntity(entity);
    if (!newEntity) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newEntity });
    }
  }

  @Get()
  async findAll(@Res() res) {
    const allEntity = await this.entityService.findAllEntity();
    return res.status(HttpStatus.ACCEPTED).json({ allEntity });
  }
  @Get('detail/:id')
  async findOne(@Res() res, @Param('id') id: string) {
    const detailEntity = await this.entityService.findOne(id);
    if (!detailEntity) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.OK).JSON({ detailEntity });
    }
  }

  @Patch()
  update(@Payload() entity: entityDocument) {
    return this.entityService.update(entity.id, entity);
  }
}
