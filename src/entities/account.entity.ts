import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import accountSettings from '../settings/settings.account';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column(accountSettings())
  lastName: string;

  @Column(accountSettings())
  username: string;

  @Column(accountSettings())
  password: string;
}

/*

This entity will create this following database table:

+-------------+--------------+-----------------------------+
|                          users                           |
+-------------+---------------+----------------------------+
| ID          | int(11)       | PRIMARY KEY AUTO_INCREMENT |
| firstName   | varchar(2048) |                            |
| lastName    | varchar(2048) |                            |
| username    | varchar(2048) |                            |
| password    | varchar(2048) |                            |
+-------------+---------------+----------------------------+

*/
