import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { Payload } from '@nestjs/microservices';
import { Icreate, ILogin } from 'src/interfaces/authentication.type';
import { AuthenticationService } from './authentication.service';

@Controller('user')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('create')
  async create(@Payload() regis: Icreate) {
    return this.authenticationService.create(regis);
  }

  @Get()
  async allUser() {
    return this.authenticationService.allUser();
  }

  @Post('login')
  async logIn(@Payload() login: ILogin) {
    return this.authenticationService.logIn(login);
  }

  //   @MessagePattern('findOneAuthentication')
  //   findOne(@Payload() id: number) {
  //     return this.authenticationService.findOne(id);
  //   }

  //   @MessagePattern('updateAuthentication')
  //   update(@Payload() updateAuthenticationDto: UpdateAuthenticationDto) {
  //     return this.authenticationService.update(updateAuthenticationDto.id, updateAuthenticationDto);
  //   }

  //   @MessagePattern('removeAuthentication')
  //   remove(@Payload() id: number) {
  //     return this.authenticationService.remove(id);
  //   }
}
