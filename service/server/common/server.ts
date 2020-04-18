import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import cors from 'cors';
import WS from '../services/ws.service';

import installValidator from './openapi';

const app = express();
const exit = process.exit;

export default class ExpressServer {
  private routes: (app: Application) => void;
  public httpServer: any;
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(cors({ credentials: true, origin: '*' }));
  }

  router(routes: (app: Application) => void): ExpressServer {
    this.routes = routes;
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): any =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

    installValidator(app, this.routes)
      .then(() => {
        this.httpServer = http.createServer(app);
        WS.init(this.httpServer);
        this.httpServer.listen(port, welcome(port));
      })
      .catch(e => {
        l.error(e);
        exit(1);
      });

    return app;
  }
}
