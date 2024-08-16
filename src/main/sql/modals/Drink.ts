/* eslint-disable import/no-cycle */
import { type CreationOptional, NOW } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { StoreModel } from './index';

@Table({
  freezeTableName: true,
  modelName: 'drinks', // table name
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
      fields: [
        { name: 'storeId', order: 'DESC' },
        { name: 'createdAt', order: 'DESC' },
      ],
    },
  ],
})
class Drink extends Model {
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
    allowNull: true,
    validate: {
      len: [0, 50],
    },
  })
  declare comment: CreationOptional<string>;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 7,
    },
  })
  declare sugar: CreationOptional<number>;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 8,
    },
  })
  declare ice: CreationOptional<number>;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
    defaultValue: 1,
  })
  declare star: number;

  @Column({
    type: DataType.DATE(3),
    allowNull: false,
    defaultValue: NOW,
  })
  declare createdAt: CreationOptional<Date>;

  @ForeignKey(() => StoreModel)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  declare storeId: number;

  @BelongsTo(() => StoreModel)
  declare store: StoreModel;
}

export default Drink;
