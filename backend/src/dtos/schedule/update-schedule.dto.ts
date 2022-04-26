import { EScheduleStatus } from 'src/entities/schedule.entity';

export class UpdateScheduleDTO {
  public id: string;
  public status: EScheduleStatus;
}
