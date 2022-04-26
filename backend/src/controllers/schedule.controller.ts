import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSchedulerDTO } from 'src/dtos/schedule/create-schedule.dto';
import { UpdateScheduleDTO } from 'src/dtos/schedule/update-schedule.dto';
import { Result } from 'src/models/result.model';
import { ScheduleService } from 'src/services/schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard('local'))
  @Get()
  public async findByUserEmail(@Query('email') email): Promise<Result> {
    var response = await this.scheduleService.findByUserEmail(email);
    return response;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  public async findAll(): Promise<Result> {
    return await this.scheduleService.findAll();
  }

  @Post()
  public async post(@Body() model: CreateSchedulerDTO): Promise<Result> {
    var response = await this.scheduleService.create(model);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  public async removeAppointment(
    @Body() model: UpdateScheduleDTO,
  ): Promise<Result> {
    var response = await this.scheduleService.removeAppointment(
      model.id,
      model.status,
    );
    return response;
  }
}
