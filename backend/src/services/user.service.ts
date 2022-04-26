import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dtos/user/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async create(model: CreateUserDTO): Promise<User> {
    return await this.userRepository.register(model);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(username);
  }

  public findById(userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}
