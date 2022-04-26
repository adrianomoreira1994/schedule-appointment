import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSchedulerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
  reason: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  time: string;
}
