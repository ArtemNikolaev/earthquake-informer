import L from "leaflet";
const {
  map: { center, zoom },
} = require("../../config.json");

const mapContainer = document.createElement("div");
mapContainer.id = "map";
document.body.appendChild(mapContainer);

const mapEl = L.map("map").setView(center, zoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapEl);

export function drawCircle({ coordinates, size }) {
  L.circle([coordinates[1], coordinates[0]], size).addTo(mapEl);
}
