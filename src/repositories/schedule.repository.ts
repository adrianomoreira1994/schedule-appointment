import { InternalServerErrorException } from '@nestjs/common';
import { CreateSchedulerDTO } from 'src/dtos/schedule/create-schedule.dto';
import { Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { IScheduleRepository } from './interfaces/schedule-repository.interface';

@EntityRepository(Schedule)
export class ScheduleRepository
  extends Repository<Schedule>
  implements IScheduleRepository
{
  public async register(
    model: CreateSchedulerDTO,
    user: User,
  ): Promise<Schedule> {
    const schedule = this.create();
    schedule.date = model.date;
    schedule.time = model.time;
    schedule.user = user;

    try {
      await this.save(schedule);

      return schedule;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o agendamento no banco de dados',
      );
    }
  }

  public async findByUserEmail(email: string): Promise<Schedule[]> {
    const schedules = await this.createQueryBuilder('schedules')
      .innerJoinAndSelect('schedules.user', 'user', 'user.email = :email', {
        email,
      })
      .getMany();

    return schedules;
  }

  public async findSchedule(time: string, date: string): Promise<Schedule> {
    var schedules = await this.findOne({ where: { time, date } });
    return schedules;
  }

  public async findAll(): Promise<Schedule[]> {
    var schedules = await this.find();
    return schedules;
  }

  public async getUnavailableSchedules(
    availableTimes: string[],
    date: string,
    time: string,
  ): Promise<string[]> {
    var unavailableSchedule = await this.createQueryBuilder('schedules')
      .select('time')
      .where(`time IN ('${availableTimes.join("','")}') AND date = '${date}'`)
      .getRawMany<Schedule>();

    let unavailableHour: string[] = [];
    unavailableSchedule.forEach((x) => unavailableHour.push(x.time));

    return unavailableHour;
  }
}
