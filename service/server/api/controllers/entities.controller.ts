import { Request, Response } from 'express';
import db from '../models';
import EntitiesRepo from '../repositories/entities.repo';
import entitiesRepo from '../repositories/entities.repo';

interface Get {
  all: MiddlewareParams;
}

interface Post {
  updateEntity: MiddlewareParams;
}

interface MiddlewareParams {
  (req: Request, res: Response): Promise<void>;
}

export class EntititesController {
  get(): Get {
    return {
      all: async (req: Request, res: Response): Promise<void> => {
        const entities = await EntitiesRepo.getAll();
        res.json(entities);
      },
    };
  }
  post(): Post {
    return {
      updateEntity: async (req: Request, res: Response): Promise<void> => {
        const entity = req.body;
        const updatedEntity = await EntitiesRepo.updateEntity(entity);
        res.json(updatedEntity);
      },
    };
  }
}

export default new EntititesController();
