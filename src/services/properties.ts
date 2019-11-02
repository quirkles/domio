import { get } from "https";
import { from, Observable, of } from "rxjs";
import {switchMap} from "rxjs/operators";

const API_URL = "https://interview.domio.io/properties/";

export const propertiesService = {
  getProperties(): Observable<any> {
    // tslint:disable-next-line:no-console
    return from(new Promise((res, rej) => {
      get(API_URL, (resp) => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          res(data);
        });

      }).on("error", rej);
    }))
      .pipe(
        switchMap((data: string) => of(JSON.parse(data))),
      );
  },
};
