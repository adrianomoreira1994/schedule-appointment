import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { schedulesHours } from 'src/utils/schedules.utils';
import { CreateSchedulerDTO } from 'src/dtos/schedule/create-schedule.dto';
import { User } from 'src/entities/user.entity';
import { Result } from 'src/models/result.model';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { EScheduleStatus } from 'src/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleRepository)
    private scheduleRepository: ScheduleRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async create(model: CreateSchedulerDTO): Promise<Result> {
    try {
      var user = new User();
      var userExists = await this.userRepository.findByEmail(model.email);

      const currentDate = new Date();
      currentDate.setHours(-3, 0, 0, 0);
      const dateAppointment = new Date(model.date);

      if (dateAppointment < currentDate) {
        return new Result(
          'Opps. Não é possível agendar para uma data passada.',
          false,
        );
      }

      if (!userExists) {
        user = await this.userRepository.register({
          name: model.name,
          surname: model.surname,
          email: model.email,
        });
      } else user = userExists;

      var unavailableHours =
        await this.scheduleRepository.getUnavailableSchedules(
          schedulesHours,
          model.date,
          model.time,
        );

      if (unavailableHours.includes(model.time)) {
        const availableHours = schedulesHours.filter(
          (x) => !unavailableHours.includes(x),
        );

        return new Result(
          'Horário indisponível, segue horários disponíveis para agendamento',
          false,
          availableHours,
        );
      }

      var schedule = await this.scheduleRepository.findSchedule(
        model.time,
        model.date,
      );

      if (schedule) {
        return new Result('Já existe um agendamento para este horário', true);
      }

      var created = await this.scheduleRepository.register(model, user);

      return new Result('Agendamento criado com sucesso', true, created, null);
    } catch (error) {
      return new Result(
        'Erro ao tentar criar um agendamento',
        false,
        null,
        error,
      );
    }
  }

  public async findAll(): Promise<Result> {
    var schedules = await this.scheduleRepository.findAll();
    return new Result('', true, schedules);
  }

  public async findByUserEmail(email: string): Promise<Result> {
    try {
      var schedules = await this.scheduleRepository.findByUserEmail(email);
      return new Result('', true, schedules);
    } catch (error) {
      return new Result(
        'Erro ao tentar retornar os agendamentos deste usuário',
        false,
        null,
        error,
      );
    }
  }

  public async removeAppointment(
    scheduleId: string,
    status: EScheduleStatus,
  ): Promise<Result> {
    try {
      await this.scheduleRepository.removeAppointment(scheduleId, status);
      return new Result('Agendamento alterado com sucesso', true);
    } catch (error) {
      return new Result(
        'Erro ao tentar alterar o agendamento',
        false,
        null,
        error,
      );
    }
  }
}
