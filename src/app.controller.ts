import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserAuthenticatedGuard } from './guards/user-authenticated-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  @UseGuards(UserAuthenticatedGuard)
  handleGetAllUsers(): string {
    return this.appService.getAllUsers()
  }

  @Post('/users')
  @UseGuards(UserAuthenticatedGuard)
  handleCreateUser(): string {
    return this.appService.createUser();
  }
}
