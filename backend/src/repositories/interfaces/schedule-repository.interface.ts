import { CreateSchedulerDTO } from 'src/dtos/schedule/create-schedule.dto';
import { EScheduleStatus, Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';

export interface IScheduleRepository {
  register(model: CreateSchedulerDTO, user: User): Promise<Schedule>;

  findAll(): Promise<Schedule[]>;

  findSchedule(time: string, date: string): Promise<Schedule>;

  findByUserEmail(email: string): Promise<Schedule[]>;

  removeAppointment(id: string, status: EScheduleStatus): Promise<void>;

  getUnavailableSchedules(
    availableTimes: string[],
    date: string,
    time: string,
  ): Promise<string[]>;
}
