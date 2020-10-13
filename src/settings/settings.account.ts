import { ColumnOptions } from "typeorm";

/**
 * This table settings is for user table
 * 
 * @returns column object options
 * 
 */

export default function accountSettings(): ColumnOptions  {
  return {
    length: 2048,
    type: 'varchar',
    nullable: false,
    collation: 'utf8_general_ci',
  };
}
