import { CreateUserDTO } from 'src/dtos/user/create-user.dto';
import { User } from 'src/entities/user.entity';

export interface IUserRepository {
  register(model: CreateUserDTO): Promise<CreateUserDTO>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
