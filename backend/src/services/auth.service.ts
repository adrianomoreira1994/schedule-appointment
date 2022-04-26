import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { adminAuth } from 'src/utils/authentication.util';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<string> {
    if (username === adminAuth.username && pass === adminAuth.password) {
      return username;
    }
    return '';
  }

  async login(username: string) {
    const payload = { username, sub: username };
    return {
      access_token: this.jwtService.sign(payload),
      username,
    };
  }
}
