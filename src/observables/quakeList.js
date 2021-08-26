import { fromFetch } from "rxjs/fetch";
import { catchError, distinct, map, mergeMap, switchMap } from "rxjs/operators";
import { from, of, timer } from "rxjs";
const { quake_url, update_latency } = require("../../config.json");

export const quakeList$ = timer(0, update_latency)
  .pipe(mergeMap(() => fromFetch(quake_url)))
  .pipe(
    switchMap((response) =>
      response.ok
        ? response.json()
        : of({ error: true, message: `Error ${response.status}` })
    ),
    catchError(
      (err) => console.error(err) || of({ error: true, message: err.message })
    )
  )
  .pipe(map((el) => from(el.features)))
  .pipe(mergeMap((el) => el))
  .pipe(distinct((p) => p.id))
  .pipe(
    map(({ geometry: { coordinates }, properties: { mag } }) => ({
      coordinates,
      size: mag * 10000,
    }))
  );
