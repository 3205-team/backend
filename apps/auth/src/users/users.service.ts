import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UtilsService } from './utils.service';
import { FilterService } from './filter.service';
import { FlattenMaps, Types } from 'mongoose';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly utilsService: UtilsService,
    private readonly filterService: FilterService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async find(query: { [key: string]: any } = {}) {
    const filtered = this.utilsService.compose(
      this.filterService.build('email'),
      this.filterService.build('number'),
    )(query);

    const users = await this.usersRepository.find(filtered);

    const sleep: (FlattenMaps<UserDocument> &
      Required<{ _id: Types.ObjectId }>)[] = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 5000);
    });

    return sleep.map((user) => ({ email: user.email, number: user.number }));
  }

  findOne(_id: string) {
    return this.usersRepository.findOne({ _id });
  }

  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate(
      { _id },
      { $set: updateUserDto },
    );
  }

  remove(_id: string) {
    return this.usersRepository.findOneAndDelete({ _id });
  }
}
