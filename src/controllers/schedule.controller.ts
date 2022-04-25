import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSchedulerDTO } from 'src/dtos/schedule/create-schedule.dto';
import { Schedule } from 'src/entities/schedule.entity';
import { Result } from 'src/models/result.model';
import { ScheduleService } from 'src/services/schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async findByUserEmail(@Query('email') email): Promise<Result> {
    var response = await this.scheduleService.findByUserEmail(email);
    return response;
  }

  @Get()
  public async findAll(): Promise<Result> {
    return await this.scheduleService.findAll();
  }

  @Post()
  public async post(@Body() model: CreateSchedulerDTO): Promise<Result> {
    var response = await this.scheduleService.create(model);
    return response;
  }
}
