import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';

@Controller('account')
export class AccountController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
