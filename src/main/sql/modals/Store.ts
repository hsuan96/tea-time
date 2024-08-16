/* eslint-disable import/no-cycle */
import {
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  NOW,
} from 'sequelize';
import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import * as constants from '../../../constants';
import { DrinkModel } from './index';

@Table({
  freezeTableName: true,
  modelName: 'stores', // table name
  timestamps: true,
  version: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_bin',
  paranoid: false,
  createdAt: 'createdAt',
  updatedAt: false,
  indexes: [
    {
      using: 'BTREE',
      fields: [{ name: 'createdAt', order: 'DESC' }],
    },
  ],
})
class Store extends Model<
  InferAttributes<Store>,
  InferCreationAttributes<Store>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [1, 15],
    },
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare sugarType: constants.SugarType;

  @Column({
    type: DataType.DATE(3),
    allowNull: false,
    defaultValue: NOW,
  })
  declare createdAt: CreationOptional<Date>;

  @HasMany(() => DrinkModel)
  declare drinks: DrinkModel[];
}

export default Store;
