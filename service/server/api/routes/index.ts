import { Application } from 'express';
import EntitiesRouter from './entities.router';

export default function routes(app: Application): void {
  app.use('/api/entities', EntitiesRouter);
}
