import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'nika',
      email: 'nika@gmail.com',
      subsCription: '2024-09-25T08:13:03.135Z',
    },
    {
      id: 2,
      name: 'leqso',
      email: 'leqso@gmail.com',
      subsCription: '2023-09-25T08:13:03.135Z',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const lastId = this.users[this.users.length - 1]?.id | 0;
    if (!createUserDto.email || !createUserDto.name)
      throw new BadRequestException();
    const date = new Date() as unknown as string;
    const newUser = {
      id: lastId + 1,
      subsCription: date,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((el) => el.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const updatedUser = {
      ...this.users[index],
      ...updateUserDto,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException();
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }
}
