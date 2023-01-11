import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { entity, entityModels } from 'src/models/entity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: entity.name, schema: entityModels.schema },
    ]),
  ],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
