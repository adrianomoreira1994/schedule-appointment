import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleRepository } from './repositories/schedule.repository';
import { UserRepository } from './repositories/user.repository';
import { ScheduleService } from './services/schedule.service';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { AccountController } from './controllers/account.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './config/auth.config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserRepository, ScheduleRepository]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [ScheduleService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [ScheduleController, AccountController],
})
export class AppModule {}
