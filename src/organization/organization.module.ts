import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  organization,
  organizationModels,
} from 'src/models/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: organization.name, schema: organizationModels.schema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
