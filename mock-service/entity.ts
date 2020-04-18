import config from "./config";

export interface IEntity {
  name: string;
  sortIndex: number;
  values: number[];
  randomValue(): number;
}

export default class Entity implements IEntity {
  public name: string;
  public sortIndex: number;
  public values: number[];

  constructor(name: string) {
    this.name = name;
    this.sortIndex = +name.split("-")[1];
    this.values = [];
    for (let i = 0; i < config.values; i++) {
      const value: number = this.randomValue();
      this.values.push(value);
    }
  }

  randomValue(): number {
    return Math.round((Math.random() * 2 - 1) * 10000) / 10000;
  }
}
