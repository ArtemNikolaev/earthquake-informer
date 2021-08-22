import { fromFetch } from "rxjs/fetch";
import { catchError, from, map, mergeMap, of, switchMap } from "rxjs";
const { quake_url } = require("../../config.json");

export const quakeList$ = fromFetch(quake_url)
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
  .pipe(
    map(({ geometry: { coordinates }, properties: { mag } }) => ({
      coordinates,
      size: mag * 10000,
    }))
  );
