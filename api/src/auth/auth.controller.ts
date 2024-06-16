import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './Guards/local-auth.guard';
import { AuthRequest } from './Auth-models/AuthRequest';
import { IsPublic } from './Decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
