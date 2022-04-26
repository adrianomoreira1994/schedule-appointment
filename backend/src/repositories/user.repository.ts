import { InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/user/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user-repository.interface';

@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async register(model: CreateUserDTO): Promise<User> {
    const { email, name, surname } = model;

    const user = this.create();
    user.name = name;
    user.email = email;
    user.surname = surname;

    try {
      await this.save(user);

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar o usuário no banco de dados',
      );
    }
  }

  async findByEmail(email: string): Promise<User> {
    var user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    var users = await this.find();
    return users;
  }

  async findById(id: string): Promise<User> {
    var user = await this.findOne(id);
    return user;
  }
}
