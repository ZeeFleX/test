interface IConfig {
  entities: number;
  values: number;
  apiRoot: string;
  interval: number;
}

const config: IConfig = {
  entities: +process.env.entities || 20,
  values: +process.env.values || 20,
  apiRoot: process.env.apiRoot || "http://localhost:3000/api",
  interval: +process.env.interval || 100,
};

export default config;
