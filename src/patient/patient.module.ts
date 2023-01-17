import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { patient, patientModels } from 'src/models/patient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: patient.name, schema: patientModels.schema },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
