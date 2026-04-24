
// Default location (agar DB me lat/lng nahi hai)
let lat = 28.6139;   // Delhi
let lng = 77.2090;

const map = L.map('map').setView([lat, lng], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup("Listing Location")
    .openPopup();
