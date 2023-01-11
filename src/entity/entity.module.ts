import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employee, employeeModels } from 'src/models/employee.schema';
import { entity } from 'src/models/entity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: entity.name, schema: employeeModels.schema },
    ]),
  ],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
