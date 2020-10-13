import { Repository, Transaction } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './../entities/account.entity';
import { HashService } from '@akanass/nestjsx-crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private user: Repository<Users>,
    private readonly hashService: HashService,
  ) {}

  /**
   * Save new user data to the database.
   *
   * @param user Entity Class
   *
   * @returns Promise
   *
   */

  async saveUser(user: Users): Promise<Users> {
    let TRANSACTION = await this.user.save(user);
    delete TRANSACTION.password;
    return TRANSACTION;
  }

  /**
   * Perform a query for ser authentication.
   *
   * @param {string} username - String to be authenticate
   * @param {string} password - Hashed string to be authenticate
   *
   * @returns Promise
   *
   */

  async checkUserCredentials(username: string, password: string,): Promise<Users> {
    return await this.user.findOne({
      select: ['id', 'firstName', 'lastName'],
      where: [{ username: username, password: password }],
    });
  }

  /**
   * Perform an password encryption for security.
   *
   * @param {string} password - Plain password text to be hash
   *
   * @returns hashed text
   *
   */

  async encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const SALT = 'Bwfo.1Zcx!ZcM}cwSmU)%+V*z}n6Qs';
      const ITERATION = 128;
      const KEY_LENGTH = 32;
      const ALGORITHM = 'sha256';
      this.hashService
        .generate(password, SALT, ITERATION, KEY_LENGTH, ALGORITHM)
        .subscribe(
          (buffer: Buffer) => resolve(buffer.toString('hex')),
          e => reject(e),
        );
    });
  }
}

// Everyone can code but, not everyone can make clean code. 😉