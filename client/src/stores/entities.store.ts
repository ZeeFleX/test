import { observable, computed, action } from "mobx";
import { getEntitiesAction } from "../api/entities";

interface Entity {
  id: number;
  name: string;
  sortIndex: number;
  values: number[];
}

class EntitiesStore {
  // Properties
  @observable items: Entity[] = [];
  @observable valuesCount: number = 0;
  @observable valuesSummaryMethods: string[] = [];

  sum(index) {
    const values: number[] = this.items.map((entity) => {
      return entity.values[index];
    });
    const sum: number = values.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    return Math.round(sum * 10000) / 10000;
  }

  min(index) {
    const values: number[] = this.items.map((entity) => {
      return entity.values[index];
    });
    const min: number = Math.min(...values);

    return Math.round(min * 10000) / 10000;
  }

  max(index) {
    const values: number[] = this.items.map((entity) => {
      return entity.values[index];
    });
    const max: number = Math.max(...values);

    return Math.round(max * 10000) / 10000;
  }

  avg(index) {
    const values: number[] = this.items.map((entity) => {
      return entity.values[index];
    });
    const sum: number = values.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    return Math.round((sum / values.length) * 10000) / 10000;
  }

  // Computed

  // Actions
  @action async getEntities() {
    const entities: Entity[] = await getEntitiesAction();
    this.items = entities;
    this.valuesCount = entities[0].values.length;
    this.valuesSummaryMethods = new Array(this.valuesCount).fill("sum");
  }

  @action updateEntity(newEntity) {
    this.items = this.items.map((entity) => {
      if (entity.id !== newEntity.id) return entity;
      return newEntity;
    });
  }

  @action valueMethodChange(e, index) {
    this.valuesSummaryMethods[index] = e.target.value;
  }
}

export default new EntitiesStore();
