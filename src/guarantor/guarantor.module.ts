import { Module } from '@nestjs/common';
import { GuarantorService } from './guarantor.service';
import { GuarantorController } from './guarantor.controller';
import { guarantor, guarantorModels } from 'src/models/guarantor.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: guarantor.name, schema: guarantorModels.schema },
    ]),
  ],
  controllers: [GuarantorController],
  providers: [GuarantorService],
})
export class GuarantorModule {}
