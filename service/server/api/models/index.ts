import { Sequelize } from 'sequelize-typescript';
import dbConfig from '../../../config/config.json';

const config = dbConfig[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize({
  ...config,
  models: [__dirname + '/*.model.ts'],
});

export default sequelize.models;
