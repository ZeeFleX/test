import db from '../models';
import { Model } from 'sequelize/types';
import ws from '../../services/ws.service';

export interface IEntity {
  id: number;
  name: string;
  sortIndex: number;
  values: number[];
}

class EntitiesRepo {
  async getAll(): Promise<Model[]> {
    try {
      const entities = await db.Entity.findAll<Model>({
        order: [['sortIndex', 'asc']],
      });

      return entities;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  async updateEntity(newEntity: IEntity): Promise<Model> {
    try {
      const updatedEntity = await db.Entity.findOne<Model>({
        where: {
          name: newEntity.name,
        },
      }).then(entity => {
        if (entity) {
          entity.update(newEntity);
          return entity;
        } else {
          return db.Entity.create(newEntity);
        }
      });

      ws.sendMessage('updateEntity', updatedEntity);
      return updatedEntity;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default new EntitiesRepo();
