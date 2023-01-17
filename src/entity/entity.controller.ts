import {
  Controller,
  Res,
  HttpStatus,
  Post,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IFilterParams } from 'src/interfaces/filter.type';
import { entityDocument } from 'src/interfaces/mongoose.gen';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Res() res, @Payload() entity: entityDocument) {
    const newEntity = await this.entityService.createEntity(entity);
    newEntity.created_at;
    if (!newEntity) {
      return res.status(HttpStatus.BAD_REQUEST);
    }
    {
      return res.status(HttpStatus.CREATED).json({ newEntity });
    }
  }

  @Get('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const allEntity = await this.entityService.findAllEntity(filter);
    return res.status(HttpStatus.ACCEPTED).json({ allEntity });
  }
  @Get('search/:id')
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
