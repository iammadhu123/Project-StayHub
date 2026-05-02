if (typeof coordinates === "string") {
    coordinates = JSON.parse(coordinates);
}

const lng = coordinates[0];
const lat = coordinates[1];

const position = [lat, lng];

const map = L.map("map").setView(position, 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

const redIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.marker(position, { icon: redIcon })
    .addTo(map)
    .bindPopup("<b>Stay Location</b>")
    .openPopup();