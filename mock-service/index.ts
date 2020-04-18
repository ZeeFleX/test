import config from "./config";
import Entity, { IEntity } from "./entity";
import axios from "axios";

function generateName(entityCount: number): string {
  const index = Math.floor(Math.random() * entityCount);
  return `entity-${index}`;
}

async function sendData(entity: IEntity): Promise<void> {
  try {
    await axios.post(`${config.apiRoot}/entities`, entity);
  } catch (error) {
    console.error(error);
  }
}

setInterval(() => {
  const newEntity: IEntity = new Entity(generateName(config.entities));
  sendData(newEntity);
}, config.interval);
