import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { unit, unitModels } from 'src/models/unit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: unit.name, schema: unitModels.schema }]),
  ],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
