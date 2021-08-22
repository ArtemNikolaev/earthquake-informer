import { quakeList$ } from "./src/observables/quakeList";
import { drawCircle } from "./src/utils/mapContainer";

quakeList$.subscribe(drawCircle);
