import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const newUser = this.create({ username, password });

    try {
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        // uniqued field conflicts
        throw new ConflictException(
          `This username (${username}) already exists.`,
        );
      }
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
