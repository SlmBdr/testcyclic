import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppointmentModule } from './appointment/appointment.module';
import { EmployeeModule } from './employee/employee.module';
import { UnitModule } from './unit/unit.module';
import { OrganizationModule } from './organization/organization.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/core-test'),
    ConfigModule.forRoot(),
    AppointmentModule,
    EmployeeModule,
    UnitModule,
    OrganizationModule,
    EntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
