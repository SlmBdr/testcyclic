import { Module } from '@nestjs/common';
import { RegistrationCobService } from './registration_cob.service';
import { RegistrationCobController } from './registration_cob.controller';
import { registrationCob,registrationCobModels } from 'src/models/registration_cob.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: registrationCob.name, schema: registrationCobModels.schema },
    ]),
  ],
  controllers: [RegistrationCobController],
  providers: [RegistrationCobService],
})
export class RegistrationCobModule {}
