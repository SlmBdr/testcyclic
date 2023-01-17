import {
  Controller,
  Res,
  Post,
  Body,
  HttpStatus,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { error } from 'console';
import { IFilterParams } from 'src/interfaces/filter.type';
import { organizationDocument } from 'src/interfaces/mongoose.gen';
import { OrganizationService } from './organization.service';

@Controller('/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  async create(@Res() res, @Body() organization: organizationDocument) {
    const newOrganization = await this.organizationService.createOrganization(
      organization,
    );
    if (newOrganization) {
      return res.status(HttpStatus.CREATED).json({ newOrganization });
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        data: null,
        error,
      });
    }
  }

  @Post('find')
  async findAll(@Res() res, @Payload() filter: IFilterParams) {
    const data = await this.organizationService.findAllOrganization(filter);
    if (data === null || '') {
      return res.status(HttpStatus.BAD_REQUEST), error;
    } else {
      return res.status(HttpStatus.OK).json({
        data,
      });
    }
  }

  @Get('search/:name')
  async findOne(@Res() res, @Param('name') name: string) {
    const organizationDetail = await this.organizationService.findOne(name);
    if (organizationDetail === null || '') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'not found',
      });
    }
    {
      return res.status(HttpStatus.OK).json({
        organizationDetail,
      });
    }
  }

  @Patch('update/:id')
  async update(@Res() res, @Payload() organization: organizationDocument) {
    const organizationUpdate = await this.organizationService.update(
      organization.name,
      organization,
    );
    if (!organizationUpdate) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'update failed',
      });
    }
    {
      return res.status(HttpStatus.CREATED).json({
        organizationUpdate,
      });
    }
  }
}
