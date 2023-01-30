import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { firebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, firebaseService],
})
export class AuthenticationModule {}
