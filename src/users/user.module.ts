import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/account.entity';
import { UserController } from './user.controller';
import { UserService } from '../users/user.service';
import { CryptoModule } from '@akanass/nestjsx-crypto';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), CryptoModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
