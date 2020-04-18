import config from "../config/config";

export function getEntitiesAction() {
  return fetch(`${config.apiRoot}/entities`).then((Response) =>
    Response.json()
  );
}
