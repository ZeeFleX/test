import {
  Table,
  Column,
  Model,
  HasMany,
  HasOne,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export default class Entity extends Model<Entity> {
  @Column
  name: string;

  @Column
  sortIndex: number;

  @Column
  set values(values: string) {
    this.setDataValue('values', JSON.stringify(values));
  }
  get values(): string {
    return this.getDataValue('values')
      ? JSON.parse(this.getDataValue('values'))
      : [];
  }
}
