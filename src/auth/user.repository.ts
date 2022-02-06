import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDto): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({ username, password: hashedPassword });

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
