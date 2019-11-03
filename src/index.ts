import {
  map as rMap,
  pick,
  pipe,
  prop,
} from "ramda";
import {Interface} from "readline";
import { timer } from "rxjs";
import {
  flatMap,
  map,
  tap,
} from "rxjs/operators";
import * as sqlite from "sqlite3";

import doAlertIfRequired from "./alerts";
import { propertiesService } from "./services";

const sqlite3 = sqlite.verbose();

const db = new sqlite3.Database("./db/domio.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS properties (
    id uuid,
    dynamicDisplayPrice integer,
    type TEXT,
    basePrice integer,
    dateTimeOfPrice integer,
    PRIMARY KEY (id, dateTimeOfPrice)
    );`,
  );
});

const pollingIntervalMs = 5000;

export interface IProperty {
  dynamicDisplayPrice: number;
  id: string;
  type: string;
  basePrice: number;
  dateTimeOfPrice: number;
}

export const getPropertyDataFromResponse = pipe(
  prop("properties"),
  rMap(
    pipe(
      pick(["dynamicDisplayPrice", "id", "type", "basePrice"]),
      (data) => ({...data, dateTimeOfPrice: Date.now()}),
    ),
  ),
);

const savePropertyData = (properties) => {
  for (const property of properties) {
    const { id, dynamicDisplayPrice, type, basePrice, dateTimeOfPrice} = property;
    const query = `INSERT INTO properties (id, dynamicDisplayPrice, type, basePrice, dateTimeOfPrice)
          VALUES('${id}', ${dynamicDisplayPrice}, '${type}', ${basePrice}, ${dateTimeOfPrice})`;
    db.serialize(() => {
      db.run(query);
    });
  }
};

timer(0, pollingIntervalMs)
  .pipe(
    flatMap(() => propertiesService.getProperties()),
    map(getPropertyDataFromResponse),
    tap(doAlertIfRequired),
    tap(savePropertyData),
  )
  .subscribe();
